import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.PUBLIC_URL || "http://127.0.0.1:3000";

  return new NextResponse(
    JSON.stringify({
      client_id: `${baseUrl}/oauth-client-metadata.json`,
      client_name: "Herceg",
      client_uri: baseUrl,
      redirect_uris: [`${baseUrl}/oauth/callback`],
      token_endpoint_auth_method: "none",
      scope: "atproto",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      dpop_bound_access_tokens: true,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600", // cache metadata for runtime efficiency
      },
    },
  );
}
