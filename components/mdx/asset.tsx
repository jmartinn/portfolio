import Image from "next/image";

import { assetUrl, isVideo } from "@/lib/media/path";

interface AssetProps {
  slug: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  poster?: string;
}

export function Asset({ slug, src, alt, width, height, poster }: AssetProps) {
  const url = assetUrl(slug, src);

  if (isVideo(src)) {
    return (
      <video
        src={url}
        poster={poster ? assetUrl(slug, poster) : undefined}
        controls
        playsInline
        muted
        preload="metadata"
        className="w-full rounded-md"
        aria-label={alt}
      />
    );
  }

  if (!width || !height) {
    throw new Error(
      `<Asset src="${src}"> is missing width/height. Images require both.`
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className="rounded-lg"
    />
  );
}
