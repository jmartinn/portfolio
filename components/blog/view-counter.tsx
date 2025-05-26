interface ViewCounterProps {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
}

export default function ViewCounter({ slug, allViews }: ViewCounterProps) {
  const viewsForSlug = allViews?.find((view) => view.slug === slug);
  const count = viewsForSlug?.count || 0;

  return (
    <span className="font-mono text-xs text-foreground/60">
      {count.toLocaleString()} {count === 1 ? "view" : "views"}
    </span>
  );
}
