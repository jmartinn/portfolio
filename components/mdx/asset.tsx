import Image from "next/image";

import { Lightbox } from "@/components/blog/lightbox";
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

  // Portrait art is a phone screenshot: render it small so it reads as a
  // device rather than swallowing the viewport. Landscape art keeps the
  // full column. Either way it can be opened full size.
  const isPhone = height > width;

  return (
    <Lightbox
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={isPhone ? "w-full max-w-[240px]" : "w-full"}
    >
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        sizes={isPhone ? "240px" : "(max-width: 768px) 100vw, 624px"}
        className="h-auto w-full rounded-lg"
      />
    </Lightbox>
  );
}
