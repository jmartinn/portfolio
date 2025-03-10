import { MusicWidget } from "@/components/music-widget";

import { Icons } from "../ui/icons";

export function Footer() {
  return (
    <footer className="my-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-8 md:mb-0">
            <MusicWidget
              albumArt="/images/album-cover.jpg"
              title="Somewhere in Stockholm"
              artist="Avicii"
            />
          </div>

          <ul className="flex flex-col space-y-2 text-neutral-600 dark:text-neutral-300">
            <li>
              <a
                className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                rel="noopener noreferrer"
                target="_blank"
                href="https://x.com/jmartinn07"
              >
                <Icons.arrow className="size-3" />
                <span className="ml-2">follow me on twitter</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                rel="noopener noreferrer"
                target="_blank"
                href="mailto:juamp_m@hotmail.com"
              >
                <Icons.arrow className="size-3" />
                <span className="ml-2">send me an email</span>
              </a>
            </li>
            <li>
              <a
                className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                rel="noopener noreferrer"
                target="_blank"
                href="/resume"
              >
                <Icons.arrow className="size-3" />
                <span className="ml-2">resume</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
