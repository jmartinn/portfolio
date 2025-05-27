import { Icons } from "@/components/ui/icons";

type BlogLinkProps = {
  slug: string;
  name: string;
  summary?: string;
};

export default function BlogLink({ slug, name, summary }: BlogLinkProps) {
  return (
    <div className="group" key={slug}>
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-4 py-5 transition-all hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-700"
      >
        <div className="flex max-w-[85%] flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          {summary && (
            <p className="truncate text-sm text-neutral-600 dark:text-neutral-400">
              {summary}
            </p>
          )}
        </div>
        <div className="ml-4 text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <Icons.arrow />
        </div>
      </a>
    </div>
  );
}
