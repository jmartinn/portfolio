/**
 * Navigation configuration for the application.
 * Centralizes all navigation items and routes for easy maintenance.
 */

/**
 * Main navigation items displayed in the sidebar.
 * Order matters - items appear in the same order as defined here.
 */
export const navItems = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/uses", name: "uses" },
  { path: "/blog", name: "blog" },
] as const;

/**
 * All site routes for sitemap generation.
 * Automatically derived from navigation items.
 */
export const siteRoutes = navItems.map((item) => item.path);

/**
 * Type for navigation item paths.
 * Ensures type safety when referencing routes.
 */
export type NavPath = (typeof navItems)[number]["path"];
