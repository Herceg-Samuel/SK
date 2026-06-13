import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/auth/client";
import dbConnect from "@/lib/mongodb";
import { getDidRole } from "@/lib/auth/roles";
import { User } from "@/models/User";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://127.0.0.1:3000";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const client = await getOAuthClient();

    // Exchange code for session
    const { session } = await client.callback(params);
    const role = getDidRole(session.did);

    await dbConnect();
    await User.updateOne(
      { did: session.did },
      {
        $set: {
          handle: session.did,
          role,
          isAdmin: role === "owner",
          lastLoginAt: new Date(),
        },
        $setOnInsert: {
          did: session.did,
        },
      },
      { upsert: true },
    );

    const response = NextResponse.redirect(new URL("/", PUBLIC_URL));

    // Set DID cookie
    response.cookies.set("did", session.did, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(new URL("/?error=login_failed", PUBLIC_URL));
  }
}
