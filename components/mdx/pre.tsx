"use client";
import { useRef } from "react";

import { Icons } from "../ui/icons";
import { useToast } from "../ui/use-toast";

export function Pre({
  children,
  ...props
}: {
  [x: string]: unknown;
  children: React.ReactNode;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          description: "Copied to clipboard!",
        });
      },
      () => {
        toast({
          description: "Failed to copy to clipboard",
          variant: "destructive",
        });
      }
    );
  };

  const handleCopy = () => {
    const text = preRef.current ? preRef.current.innerText : "";
    copyToClipboard(text);
  };

  return (
    <pre
      ref={preRef}
      className="flex flex-row items-start px-4 font-mono"
      {...props}
    >
      <div className="grow self-center">{children}</div>
      <button
        onClick={handleCopy}
        className="rounded bg-neutral-200 p-2 text-xs text-neutral-900 shadow-md hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 hover:dark:bg-neutral-600"
      >
        <Icons.clipboard />
      </button>
    </pre>
  );
}
