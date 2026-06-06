import { agent } from "@/lib/atproto";

export type Note = {
  id: string;
  title: string;
  href: string;
};

type BskyPostRecord = {
  text?: unknown;
};

function isTextRecord(record: unknown): record is BskyPostRecord {
  return typeof record === "object" && record !== null && "text" in record;
}

function extractText(record: BskyPostRecord): string {
  if (typeof record.text === "string") return record.text;
  return "";
}

export async function getProfileSafe(handle: string) {
  try {
    const profile = await agent.getProfile({ actor: handle });
    return profile.data;
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    return null;
  }
}

export async function getNotesSafe(handle: string): Promise<Note[]> {
  try {
    const profile = await agent.getProfile({ actor: handle });

    const feed = await agent.getAuthorFeed({
      actor: profile.data.did,
      limit: 5,
    });

    const items = feed?.data?.feed ?? [];

    return items
      .map((item): Note | null => {
        const record = item.post.record;

        if (!isTextRecord(record)) {
          return null;
        }

        const text = extractText(record);

        const uriParts = item.post.uri.split("/");
        const postId = uriParts.at(-1);

        if (!postId) return null;

        return {
          id: item.post.uri,
          title: text.trim().length ? text.slice(0, 80) : "Note",
          href: `https://bsky.app/profile/${handle}/post/${postId}`,
        };
      })
      .filter((n): n is Note => n !== null);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    return [];
  }
}
