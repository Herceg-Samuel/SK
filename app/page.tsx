import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { PostList } from "@/components/PostList";
import { getProfileSafe, getNotesSafe } from "@/lib/bluesky";

export default async function Home() {
  const handle = "skherceg.bsky.social";

  const [profile, notes] = await Promise.all([
    getProfileSafe(handle),
    getNotesSafe(handle),
  ]);

  return (
    <Container>
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">
          {profile?.displayName ?? "Writer"}
        </h1>

        <p className="mt-2 text-orange-200">
          Writing about stuff. Good stuff!!
        </p>
      </header>

      <Section title="About">
        <p className="text-orange-100 leading-relaxed">
          I write essays and build projects. This site is my publishing home,
          essays live here, notes live on Bluesky, everything else is an archive
          of what I am building.
        </p>
      </Section>

      <Section title="Essays">
        <PostList
          items={[
            { id: "1", title: "Why I am Building This", href: "/#" },
            { id: "2", title: "On Systems Thinking", href: "/#" },
          ]}
        />
      </Section>

      <Section title="Notes">
        {notes.length > 0 ? (
          <PostList items={notes} />
        ) : (
          <p className="text-sm text-orange-200">No notes yet.</p>
        )}
      </Section>

      <Section title="Projects">
        <PostList
          items={[
            {
              id: "p1",
              title: "Atmospheric Website",
              href: "/#",
            },
            {
              id: "p2",
              title: "Personal Analytics Tool",
              href: "/#",
            },
          ]}
        />
      </Section>

      <footer className="mt-16 text-sm text-orange-100">
        Built with Next.js + ATProto
      </footer>
    </Container>
  );
}
