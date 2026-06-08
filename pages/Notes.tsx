import { Section } from "@/components/Section";
import { PostList } from "@/components/PostList";
import { getNotesSafe } from "@/lib/bluesky";

const handle = "skherceg.bsky.social";

export default async function Notes() {
  const [notes] = await Promise.all([getNotesSafe(handle)]);
  return (
    <>
      {" "}
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
    </>
  );
}
