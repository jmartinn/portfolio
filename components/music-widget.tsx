import { Card } from "@/components/ui/card";

interface MusicWidgetProps {
  title?: string;
  artist?: string;
  albumArt?: string;
}

export function MusicWidget({
  title = "Weightless",
  artist = "Marconi Union",
  albumArt = "/placeholder.svg?height=300&width=300",
}: MusicWidgetProps) {
  return (
    <Card className="flex w-full max-w-xs items-center overflow-hidden rounded-lg border-zinc-800 bg-zinc-900 p-4 shadow-md">
      {/* Vinyl container with explicit dimensions */}
      <div className="mr-4 size-16 shrink-0">
        <div
          className="relative size-full rounded-full"
          style={{
            background: "linear-gradient(145deg, #111, #222)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            animation: "spin 4s linear infinite",
          }}
        >
          {/* Vinyl edge */}
          <div className="absolute inset-0 rounded-full border border-zinc-800"></div>

          {/* Vinyl grooves */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full opacity-40"
            style={{
              background:
                "repeating-radial-gradient(circle at center, transparent 0, transparent 1px, rgba(30, 30, 30, 1) 1px, rgba(30, 30, 30, 1) 2px, transparent 2px, transparent 3px, rgba(30, 30, 30, 1) 3px, rgba(30, 30, 30, 1) 4px)",
            }}
          ></div>

          {/* Album art */}
          <div
            className="absolute left-1/2 top-1/2 z-10 size-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              backgroundImage: `url(${albumArt})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 0 4px rgba(0, 0, 0, 0.8)",
            }}
          ></div>

          {/* Center hole */}
          <div className="absolute left-1/2 top-1/2 z-20 size-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800 bg-black"></div>

          {/* Reflection */}
          <div
            className="absolute inset-0 z-30 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            }}
          ></div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-white">{title}</div>
        <div className="truncate text-xs text-zinc-400">{artist}</div>
        <div className="mt-1.5 flex items-center">
          <div className="mr-1.5 size-1.5 animate-pulse rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Now Playing
          </span>
        </div>
      </div>
    </Card>
  );
}
