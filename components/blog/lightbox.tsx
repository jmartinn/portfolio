"use client";

import { useRef } from "react";

import Image from "next/image";

interface LightboxProps {
  /** The thumbnail rendered inline in the figure. */
  children: React.ReactNode;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Sizing for the inline thumbnail button. */
  className?: string;
  /** The inline thumbnail's `sizes`, reused so the blur-up placeholder is a
   *  cache hit against the variant the page already downloaded. */
  thumbSizes: string;
}

/**
 * Click-to-enlarge wrapper for blog screenshots. Built on the native
 * <dialog> element, which supplies focus trapping, Escape-to-close and
 * top-layer stacking without any of it hand-rolled. Styles live under
 * "Screenshot lightbox" in globals.css.
 */
export function Lightbox({
  children,
  src,
  alt,
  width,
  height,
  className,
  thumbSizes,
}: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // The served variant caps how large the enlarged image can render, so hint a
  // width that matches how each orientation is actually constrained: portraits
  // are bounded by viewport height (staying narrow), landscapes by width.
  const enlargedSizes =
    height > width
      ? "(max-width: 640px) 92vw, 620px"
      : "(max-width: 900px) 92vw, 1200px";

  return (
    <>
      <button
        type="button"
        className={`sh-zoom ${className ?? ""}`}
        onClick={() => ref.current?.showModal()}
        aria-label={`Enlarge image: ${alt}`}
      >
        {children}
      </button>

      <dialog
        ref={ref}
        className="sh-dialog"
        aria-label={alt}
        // The dialog fills the viewport and centres the figure, so any click
        // that lands on the dialog itself (the area around the image) dismisses.
        onClick={(event) => {
          if (event.target === ref.current) ref.current.close();
        }}
      >
        <figure className="sh-dialog-inner">
          {/* Instant placeholder: same `sizes` as the inline thumbnail, so it
              resolves to the already-downloaded variant and paints with no
              network wait. Blurred and scaled up to stand in for the hi-res. */}
          <Image
            src={src}
            alt=""
            aria-hidden
            width={width}
            height={height}
            sizes={thumbSizes}
            className="sh-dialog-ph"
          />
          {/* Full-resolution image, fades in over the placeholder once decoded. */}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={enlargedSizes}
            className="sh-dialog-img sh-dialog-hires"
            onLoad={(event) => {
              event.currentTarget.dataset.loaded = "true";
            }}
          />
          <button
            type="button"
            className="sh-close"
            onClick={() => ref.current?.close()}
            aria-label="Close image"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="size-4"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </figure>
      </dialog>
    </>
  );
}
