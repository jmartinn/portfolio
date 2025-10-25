/**
 * Application-wide constants and configuration values.
 * Centralized configuration for timeouts, intervals, and limits.
 */

// =============================================================================
// SPOTIFY INTEGRATION CONFIGURATION
// =============================================================================

/**
 * Interval for polling Spotify API for currently playing track.
 * Set to 30 seconds to balance freshness with API rate limits.
 * Spotify recommends polling no more frequently than once every 30 seconds.
 */
export const SPOTIFY_POLL_INTERVAL = 30_000; // 30 seconds in milliseconds

/**
 * Deduplication interval for SWR to prevent duplicate requests.
 * Requests within this window will reuse cached data.
 */
export const SPOTIFY_DEDUP_INTERVAL = 5_000; // 5 seconds in milliseconds

/**
 * TTL for Spotify access token in Vercel KV storage.
 * Set to 3550 seconds (59 minutes 10 seconds) to expire 50 seconds
 * before the actual 1-hour token expiry, providing a safety buffer
 * to avoid using expired tokens.
 */
export const SPOTIFY_TOKEN_TTL = 3_550; // ~59 minutes in seconds

// =============================================================================
// BLOG & CONTENT CONFIGURATION
// =============================================================================

/**
 * ISR (Incremental Static Regeneration) revalidation period for blog posts.
 * Blog posts will be regenerated at most once per hour.
 * This balances freshness with build performance.
 */
export const BLOG_REVALIDATE_SECONDS = 3_600; // 1 hour in seconds

/**
 * Words per minute for reading time calculation.
 * Average reading speed for technical content.
 */
export const READING_SPEED_WPM = 200;

// =============================================================================
// API & VALIDATION CONFIGURATION
// =============================================================================

/**
 * Maximum length for OpenGraph image titles.
 * Ensures titles fit within the OG image layout and prevents abuse.
 */
export const OG_TITLE_MAX_LENGTH = 100;

/**
 * Maximum length for general string inputs in API routes.
 */
export const MAX_STRING_LENGTH = 200;

/**
 * Maximum length for blog post slugs.
 */
export const MAX_SLUG_LENGTH = 100;
