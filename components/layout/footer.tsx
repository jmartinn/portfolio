export function Footer() {
  return (
    <footer className="px-6 pb-24 pt-12 text-center text-xs text-foreground/60 md:px-12 md:text-left lg:pl-32 xl:pl-40">
      <div className="mx-auto max-w-screen-xl">
        <p>© {new Date().getFullYear()} jmartinn — All Rights Reserved</p>
      </div>
    </footer>
  );
}
