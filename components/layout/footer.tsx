import { Icons } from "../ui/icons";

export function Footer() {
  return (
    <footer className="mb-16">
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <Icons.arrow />
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/jmartinn07"
          >
            <Icons.arrow />
            <p className="h-7 ml-2">follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:juamp_m@hotmail.com"
          >
            <Icons.arrow />
            <p className="h-7 ml-2">send me an email</p>
          </a>
        </li>
      </ul>
    </footer>
  );
}
