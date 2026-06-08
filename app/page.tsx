import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { getProfileSafe } from "@/lib/bluesky";
// import { getSession } from "@/lib/auth/session";
// import { LoginForm } from "@/components/LoginForm";
// import { LogoutButton } from "@/components/LogOutButton";
import Essays from "@/pages/Essays";
import Notes from "@/pages/Notes";

export default async function Home() {
  const handle = "skherceg.bsky.social";
  // const session = await getSession();

  const [profile] = await Promise.all([getProfileSafe(handle)]);

  return (
    <Container>
      <header className="mb-12">
        <h1 className="text-3xl text-orange-300 font-bold font-mono tracking-tight">
          {profile?.displayName ?? "Writer"}
        </h1>

        {/* <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          {session ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Signed in as <span className="font-mono">{session.did}</span>
                </p>
                <LogoutButton />
              </div>
              <p className="text-green-600">Authentication working!</p>
            </div>
          ) : (
            <LoginForm />
          )}
        </div> */}

        <p className="mt-2 text-orange-200">
          Writing about stuff. Good stuff!!
        </p>
      </header>

      <Section title="About">
        <p className="text-orange-200 leading-relaxed">
          I write essays and build projects. This site is my publishing home,
          essays live here, notes live on Bluesky, everything else is an archive
          of what I am building.
        </p>
      </Section>

      <Essays />
      <Notes />

      <footer className="mt-16 text-sm text-orange-100">
        Built with Next.js + ATProto
      </footer>
    </Container>
  );
}
