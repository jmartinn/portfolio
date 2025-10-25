"use client";

import useSWR from "swr";

import { Card } from "@/components/ui/card";
import { SPOTIFY_DEDUP_INTERVAL, SPOTIFY_POLL_INTERVAL } from "@/lib/constants";

interface TrackInfo {
  artist: string;
  song: string;
  isPlaying: boolean;
  cover: string;
}

interface MusicWidgetProps {
  title?: string;
  artist?: string;
  albumArt?: string;
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch track info");
    return res.json();
  });

/**
 * Music widget that displays currently playing Spotify track.
 * Polls the Spotify API every 30 seconds using SWR.
 * Shows a spinning vinyl record animation when music is playing.
 * Falls back to default title/artist/albumArt props when nothing is playing.
 *
 * @param props - Widget configuration
 * @param props.title - Default title to display when not playing
 * @param props.artist - Default artist to display when not playing
 * @param props.albumArt - Default album art URL when not playing
 *
 * @example
 * ```tsx
 * <MusicWidget
 *   title="Not Playing"
 *   artist="Nothing"
 *   albumArt="/default-album.jpg"
 * />
 * ```
 */
export function MusicWidget({ title, artist, albumArt }: MusicWidgetProps) {
  const { data, error, isLoading } = useSWR("/api/track", fetcher, {
    refreshInterval: SPOTIFY_POLL_INTERVAL,
    revalidateOnFocus: true,
    errorRetryCount: 2,
    dedupingInterval: SPOTIFY_DEDUP_INTERVAL,
  });

  const trackInfo: TrackInfo | null = data?.trackInfo || null;

  const displayTitle = trackInfo?.isPlaying ? trackInfo.song : title;
  const displayArtist = trackInfo?.isPlaying ? trackInfo.artist : artist;
  const displayAlbumArt = trackInfo?.isPlaying ? trackInfo.cover : albumArt;
  const isPlaying = trackInfo?.isPlaying ?? false;

  return (
    <Card className="flex w-full items-center overflow-hidden rounded-lg border-neutral-200 bg-neutral-50 p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mr-4 size-16 shrink-0">
        <div
          className="relative size-full rounded-full"
          style={{
            background: "linear-gradient(145deg, #111, #222)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            animation: isPlaying ? "spin 4s linear infinite" : "none",
          }}
        >
          <div className="absolute inset-0 rounded-full border border-zinc-800" />

          <div
            className="absolute inset-0 overflow-hidden rounded-full opacity-40"
            style={{
              background:
                "repeating-radial-gradient(circle at center, transparent 0, transparent 1px, rgba(30, 30, 30, 1) 1px, rgba(30, 30, 30, 1) 2px, transparent 2px, transparent 3px, rgba(30, 30, 30, 1) 3px, rgba(30, 30, 30, 1) 4px)",
            }}
          />

          <div
            className="absolute left-1/2 top-1/2 z-10 size-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              ...(displayAlbumArt && {
                backgroundImage: `url(${displayAlbumArt})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }),
              boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.8)",
            }}
          />

          <div className="absolute left-1/2 top-1/2 z-20 size-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800 bg-black" />

          <div
            className="absolute inset-0 z-30 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
          {displayTitle}
        </div>
        <div className="truncate text-xs text-neutral-700 dark:text-neutral-300">
          {displayArtist}
        </div>
        <div className="mt-1.5 flex items-center">
          {isLoading ? (
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Loading...
            </span>
          ) : error ? (
            <span className="text-[10px] font-medium uppercase tracking-wider text-red-500">
              Connection Error
            </span>
          ) : isPlaying ? (
            <>
              <div className="mr-1.5 size-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Now Playing
              </span>
            </>
          ) : (
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Not Playing
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
