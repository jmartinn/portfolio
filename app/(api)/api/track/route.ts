import { kv } from "@vercel/kv";

import { SPOTIFY_TOKEN_TTL } from "@/lib/constants";

const SPOTIFY_TOKEN_KEY = "spotify:access_token";

/**
 * Helper to return empty track info when nothing is playing.
 */
function getEmptyTrackInfo() {
  return Response.json({
    trackInfo: {
      isPlaying: false,
      artist: "",
      song: "",
      cover: "",
    },
  });
}

/**
 * Helper to format track info from Spotify API response.
 */
function formatTrackInfo(data: {
  item: {
    artists: { name: string }[];
    name: string;
    album: { images: { url: string }[] };
  };
  is_playing: boolean;
}) {
  return {
    artist: data.item.artists[0].name,
    song: data.item.name,
    isPlaying: data.is_playing,
    cover: data.item.album.images[0].url,
  };
}

async function getSpotifyToken() {
  let token = await kv.get(SPOTIFY_TOKEN_KEY);

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

    await kv.set(SPOTIFY_TOKEN_KEY, newToken, { ex: SPOTIFY_TOKEN_TTL });

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

      if (retryResponse.status === 204 || !retryData) {
        return getEmptyTrackInfo();
      }

      const trackInfo = formatTrackInfo(retryData);
      return Response.json({ trackInfo });
    }

    if (response.status === 204) {
      return getEmptyTrackInfo();
    }

    if (response.ok) {
      const data = await response.json();
      const trackInfo = formatTrackInfo(data);
      return Response.json({ trackInfo });
    }

    throw new Error(`Spotify API error: ${response.status}`);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);

    return Response.json(
      { error: "Failed to fetch currently playing track" },
      { status: 500 }
    );
  }
}
