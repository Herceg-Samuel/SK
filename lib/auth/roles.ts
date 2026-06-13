export type SiteRole = "owner" | "contributor" | "user";

function normalizeDid(did?: string | null) {
  return did?.trim() || null;
}

export function getOwnerDid() {
  return normalizeDid(process.env.OWNER_DID);
}

export function getContributorDid() {
  return normalizeDid(process.env.CONTRIBUTOR_DID);
}

export function getDidRole(did?: string | null): SiteRole {
  const normalizedDid = normalizeDid(did);

  if (!normalizedDid) return "user";
  if (normalizedDid === getOwnerDid()) return "owner";
  if (normalizedDid === getContributorDid()) return "contributor";

  return "user";
}

export function isOwnerDid(did?: string | null) {
  return getDidRole(did) === "owner";
}

export function canContribute(did?: string | null) {
  const role = getDidRole(did);
  return role === "owner" || role === "contributor";
}
