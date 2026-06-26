// Sidebar navigation items, in display order.
export const navItems = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/projects", name: "projects" },
  { path: "/uses", name: "uses" },
  { path: "/blog", name: "blog" },
] as const;

// Site routes, derived for sitemap generation.
export const siteRoutes = navItems.map((item) => item.path);

export type NavPath = (typeof navItems)[number]["path"];
