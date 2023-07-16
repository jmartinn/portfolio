export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://johndev.app/sitemap.xml',
    host: 'https://johndev.app',
  };
}
