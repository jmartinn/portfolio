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
      className="font-mono px-4 flex flex-row items-start"
      {...props}
    >
      <div className="flex-grow self-center">{children}</div>
      <button
        onClick={handleCopy}
        className="text-xs text-neutral-900 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 hover:bg-neutral-300 hover:dark:bg-neutral-600 shadow-md px-2 py-2 rounded"
      >
        <Icons.clipboard />
      </button>
    </pre>
  );
}
