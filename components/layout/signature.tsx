"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import {
  YELLOWTAIL_J,
  YELLOWTAIL_J_ASPECT,
  YELLOWTAIL_J_BBOX,
} from "@/lib/fonts/yellowtail";

const SESSION_KEY = "signature-played";
const STROKE_WIDTH = 140;
const SPEED = 1.4;

type Phase = "placeholder" | "animate" | "static";

interface SignatureProps {
  height?: number;
  strokeWidth?: number;
}

function pointsToPath(points: number[][]): string {
  if (points.length === 0) return "";
  const [x0, y0] = points[0];
  let d = `M ${x0} ${y0}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i][0]} ${points[i][1]}`;
  }
  return d;
}

export function Signature({
  height = 30,
  strokeWidth = STROKE_WIDTH,
}: SignatureProps) {
  const [phase, setPhase] = useState<Phase>("placeholder");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const played = sessionStorage.getItem(SESSION_KEY) === "1";
    if (reduced || played) {
      setPhase("static");
    } else {
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("animate");
    }
  }, []);

  const width = Math.round(height * YELLOWTAIL_J_ASPECT);
  const viewBox = `${YELLOWTAIL_J_BBOX.x} ${YELLOWTAIL_J_BBOX.y} ${YELLOWTAIL_J_BBOX.w} ${YELLOWTAIL_J_BBOX.h}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      aria-hidden="true"
      style={{ display: "inline-block" }}
    >
      {phase !== "placeholder" &&
        YELLOWTAIL_J.s.map((stroke, i) => {
          const d = pointsToPath(stroke.p);
          if (phase === "static") {
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          }
          return (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: stroke.d / SPEED,
                duration: stroke.a / SPEED,
                ease: "easeOut",
              }}
            />
          );
        })}
    </svg>
  );
}
