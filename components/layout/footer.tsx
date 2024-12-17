import { Icons } from "../ui/icons";

export function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/jmartinn07"
          >
            <Icons.arrow />
            <p className="ml-2 h-7">follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:juamp_m@hotmail.com"
          >
            <Icons.arrow />
            <p className="ml-2 h-7">send me an email</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/resume"
          >
            <Icons.arrow />
            <p className="ml-2 h-7">resume</p>
          </a>
        </li>
      </ul>
    </footer>
  );
}
