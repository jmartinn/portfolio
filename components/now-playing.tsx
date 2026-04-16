"use client";

import useSWR from "swr";

import { SPOTIFY_DEDUP_INTERVAL, SPOTIFY_POLL_INTERVAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TrackInfo {
  artist: string;
  song: string;
  isPlaying: boolean;
  cover: string;
  songUrl?: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch track info");
    return res.json();
  });

export function NowPlaying() {
  const { data, isLoading } = useSWR("/api/track", fetcher, {
    refreshInterval: SPOTIFY_POLL_INTERVAL,
    revalidateOnFocus: true,
    errorRetryCount: 2,
    dedupingInterval: SPOTIFY_DEDUP_INTERVAL,
  });

  const trackInfo: TrackInfo | null = data?.trackInfo || null;
  const isPlaying = trackInfo?.isPlaying ?? false;

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">
        Checking what I&apos;m listening to...
      </p>
    );
  }

  if (!isPlaying || !trackInfo) {
    return (
      <p className="text-sm text-muted-foreground">
        Not playing anything right now.
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      <span>
        Listening to{" "}
        <a
          href={trackInfo.songUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "font-medium text-foreground underline decoration-muted underline-offset-2",
            "transition-colors hover:decoration-accent"
          )}
        >
          {trackInfo.song}
        </a>{" "}
        by {trackInfo.artist}
      </span>
    </p>
  );
}
