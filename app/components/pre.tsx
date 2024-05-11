"use client";
import { Icons } from "./icons";
import { useToast } from "./ui/use-toast";

export function Pre({ children, ...props }) {
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
    <pre className="px-4 flex flex-row items-start" {...props}>
      <div className="flex-grow self-center">{children}</div>
      <button
        onClick={handleCopyClick}
        className="text-xs text-neutral-900 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100 hover:bg-neutral-300 hover:dark:bg-neutral-600 shadow-md px-2 py-2 rounded"
      >
        <Icons.clipboard />
      </button>
    </pre>
  );
}
