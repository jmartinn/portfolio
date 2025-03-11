import { kv } from "@vercel/kv";

// Token key in KV store
const SPOTIFY_TOKEN_KEY = "spotify:access_token";

export async function GET() {
  try {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${process.env.SPOTIFY_AUTH_TOKEN}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
      }),
    };

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      payload
    );

    if (!response.ok) {
      throw new Error(
        `Failed to refresh token: ${response.status} ${await response.text()}`
      );
    }

    const data = await response.json();
    const accessToken: string = data.access_token;

    // Store token in KV with expiry (3600 seconds = 1 hour)
    // Set it to expire 50 seconds early to avoid edge cases
    if (accessToken) {
      await kv.set(SPOTIFY_TOKEN_KEY, accessToken, { ex: 3550 });
    }

    return Response.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    return Response.json(
      { error: "Failed to refresh Spotify token" },
      { status: 500 }
    );
  }
}
