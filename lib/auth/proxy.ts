import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";
import { canContribute, getDidRole, isOwnerDid } from "./roles";
import { getSession } from "./session";

async function getVerifiedDid() {
  const session = await getSession();
  return session?.did ?? null;
}

async function syncUserRole(did: string) {
  const role = getDidRole(did);

  await dbConnect();
  await User.updateOne(
    { did },
    {
      $set: {
        handle: did,
        role,
        isAdmin: role === "owner",
        lastLoginAt: new Date(),
      },
      $setOnInsert: { did },
    },
    { upsert: true },
  );

  return role;
}

/**
 * proxy to check if user is authenticated
 * Returns null if not authenticated, user DID if authenticated
 */
export async function checkAuth(): Promise<string | null> {
  try {
    const did = await getVerifiedDid();
    return did || null;
  } catch {
    return null;
  }
}

/**
 * proxy to ensure authentication for API routes
 */
export async function requireAuth(_req: NextRequest): Promise<{
  authenticated: boolean;
  did: string | null;
  error?: NextResponse;
}> {
  const did = await getVerifiedDid();

  if (!did) {
    return {
      authenticated: false,
      did: null,
      error: NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 },
      ),
    };
  }

  await syncUserRole(did);

  return {
    authenticated: true,
    did,
  };
}

/**
 * proxy to ensure admin access
 */
export async function requireAdmin(_req: NextRequest): Promise<{
  authorized: boolean;
  did: string | null;
  error?: NextResponse;
}> {
  const did = await getVerifiedDid();

  if (!did) {
    return {
      authorized: false,
      did: null,
      error: NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 },
      ),
    };
  }

  await syncUserRole(did);

  if (!isOwnerDid(did)) {
    return {
      authorized: false,
      did,
      error: NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      ),
    };
  }

  return {
    authorized: true,
    did,
  };
}

/**
 * proxy to ensure owner or contributor access
 */
export async function requireContributor(_req: NextRequest): Promise<{
  authorized: boolean;
  did: string | null;
  error?: NextResponse;
}> {
  const did = await getVerifiedDid();

  if (!did) {
    return {
      authorized: false,
      did: null,
      error: NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 },
      ),
    };
  }

  await syncUserRole(did);

  if (!canContribute(did)) {
    return {
      authorized: false,
      did,
      error: NextResponse.json(
        { error: "Forbidden: Contributor access required" },
        { status: 403 },
      ),
    };
  }

  return {
    authorized: true,
    did,
  };
}
