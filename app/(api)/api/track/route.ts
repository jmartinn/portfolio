import { kv } from "@vercel/kv";

// Token key in KV store
const SPOTIFY_TOKEN_KEY = "spotify:access_token";

async function getSpotifyToken() {
  // Try to get token from KV
  let token = await kv.get(SPOTIFY_TOKEN_KEY);

  // If no token found, fetch a new one
  if (!token) {
    token = await refreshSpotifyToken();
  }

  return token as string;
}

async function refreshSpotifyToken() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}api/spotify/token`
    );

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.status}`);
    }

    const data = await response.json();
    const newToken = data.accessToken;

    // Store token in KV with expiry (3600 seconds = 1 hour)
    // Set it to expire 50 seconds early to avoid edge cases
    await kv.set(SPOTIFY_TOKEN_KEY, newToken, { ex: 3550 });

    return newToken;
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const token = await getSpotifyToken();

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      const newToken = await refreshSpotifyToken();

      const retryResponse = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${newToken}`,
          },
        }
      );

      if (!retryResponse.ok) {
        throw new Error(
          `Spotify API error after token refresh: ${retryResponse.status}`
        );
      }

      const retryData = await retryResponse.json();

      // If no track is playing
      if (retryResponse.status === 204 || !retryData) {
        return Response.json({
          trackInfo: {
            isPlaying: false,
            artist: "",
            song: "",
            cover: "",
          },
        });
      }

      const trackInfo = {
        artist: retryData.item.artists[0].name,
        song: retryData.item.name,
        isPlaying: retryData.is_playing,
        cover: retryData.item.album.images[0].url,
      };

      return Response.json({ trackInfo });
    }

    // If no track is playing
    if (response.status === 204) {
      return Response.json({
        trackInfo: {
          isPlaying: false,
          artist: "",
          song: "",
          cover: "",
        },
      });
    }

    // If successful response with track data
    if (response.ok) {
      const data = await response.json();

      const trackInfo = {
        artist: data.item.artists[0].name,
        song: data.item.name,
        isPlaying: data.is_playing,
        cover: data.item.album.images[0].url,
      };

      return Response.json({ trackInfo });
    }

    // Handle other error cases
    throw new Error(`Spotify API error: ${response.status}`);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);

    return Response.json(
      { error: "Failed to fetch currently playing track" },
      { status: 500 }
    );
  }
}
