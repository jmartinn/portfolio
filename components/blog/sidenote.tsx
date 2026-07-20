"use client";

import { useId, useState } from "react";

interface NoteProps {
  children: React.ReactNode;
}

/**
 * Shared core for the two margin-note kinds. Below `xl` the ref button
 * toggles the note inline; at `xl`+ the note floats into the right gutter
 * via CSS (see "Margin notes" in globals.css) and the button is inert.
 * Everything rendered is phrasing content, so notes stay valid inside
 * prose paragraphs. Note bodies are server-rendered children.
 */
function Note({
  kind,
  children,
}: {
  kind: "side" | "margin";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  // Deterministic per-note tilt (SSR-stable via useId): a hair of rotation,
  // varied per note so a stack doesn't look like a uniform template.
  const seed = [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const tilt = ((seed % 5) - 2) * 0.35;

  return (
    <span
      className="sn"
      data-kind={kind}
      style={{ "--sn-tilt": `${tilt}deg` } as React.CSSProperties}
    >
      <button
        type="button"
        className="sn-ref"
        aria-expanded={open}
        aria-controls={id}
        aria-label={kind === "side" ? "sidenote" : "margin note"}
        onClick={() => setOpen((o) => !o)}
      />
      <small id={id} className="sn-note font-hand" data-open={open || undefined}>
        {children}
      </small>
    </span>
  );
}

export function Sidenote({ children }: NoteProps) {
  return <Note kind="side">{children}</Note>;
}

export function MarginNote({ children }: NoteProps) {
  return <Note kind="margin">{children}</Note>;
}
