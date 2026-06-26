// Application-wide configuration: timeouts, intervals, and limits.

// Spotify recommends polling no more than once every 30s.
export const SPOTIFY_POLL_INTERVAL = 30_000;

// SWR dedup window; requests within it reuse cached data.
export const SPOTIFY_DEDUP_INTERVAL = 5_000;

// Expire ~50s before the real 1-hour token TTL as a safety buffer.
export const SPOTIFY_TOKEN_TTL = 3_550;

// ISR: regenerate blog posts at most once per hour.
export const BLOG_REVALIDATE_SECONDS = 3_600;

export const READING_SPEED_WPM = 200;

// Keep OG titles within the image layout and guard against abuse.
export const OG_TITLE_MAX_LENGTH = 100;

export const MAX_STRING_LENGTH = 200;

export const MAX_SLUG_LENGTH = 100;
