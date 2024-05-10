"use client";
import { Icons } from "./icons";
import { useToast } from "./ui/use-toast";

export function Pre({ children, ...props }) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copied to clipboard successfully!");
        toast({
          description: "Copied to clipboard!",
        });
      },
      (err) => {
        console.error("Failed to copy text to clipboard", err);
      },
    );
  };

  const handleCopyClick = () => {
    if (typeof children === "string") {
      copyToClipboard(children);
    } else {
      const text = document.querySelector("pre")?.innerText || "";
      copyToClipboard(text);
    }
  };
  return (
    <pre className="py-6 px-4 relative" {...props}>
      <button
        onClick={handleCopyClick}
        className="absolute right-4 text-xs text-neutral-900 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 hover:bg-neutral-300 hover:dark:bg-neutral-600 shadow-md px-2 py-2 rounded"
      >
        <Icons.clipboard />
      </button>
      {children}
    </pre>
  );
}
