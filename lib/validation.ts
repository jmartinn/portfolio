/**
 * Input validation utilities for API routes and user inputs.
 * Provides sanitization and validation functions to prevent injection attacks.
 */

import { MAX_STRING_LENGTH, OG_TITLE_MAX_LENGTH } from "@/lib/constants";

/**
 * Validates and sanitizes a string input.
 * Removes potentially dangerous characters and limits length.
 *
 * @param input - The string to validate
 * @param maxLength - Maximum allowed length (default: MAX_STRING_LENGTH)
 * @param defaultValue - Value to return if input is invalid (default: empty string)
 * @returns Sanitized string or default value
 */
export function validateString(
  input: string | null | undefined,
  maxLength: number = MAX_STRING_LENGTH,
  defaultValue: string = ""
): string {
  if (!input || typeof input !== "string") {
    return defaultValue;
  }

  const trimmed = input.trim().slice(0, maxLength);

  return trimmed.replace(/[\x00-\x1F\x7F]/g, "");
}

/**
 * Sanitizes a title string for use in OG image generation.
 * Encodes HTML entities and removes dangerous characters.
 *
 * @param title - The title to sanitize
 * @param maxLength - Maximum title length (default: OG_TITLE_MAX_LENGTH)
 * @returns Sanitized title safe for rendering
 */
export function sanitizeTitle(
  title: string | null | undefined,
  maxLength: number = OG_TITLE_MAX_LENGTH
): string {
  const validated = validateString(title, maxLength, "Blog Post");

  return validated
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * Validates a slug format (lowercase alphanumeric with hyphens).
 *
 * @param slug - The slug to validate
 * @returns True if slug format is valid
 */
export function isValidSlug(slug: string | null | undefined): boolean {
  if (!slug || typeof slug !== "string") {
    return false;
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
}

/**
 * Validates a numeric ID.
 *
 * @param id - The ID to validate
 * @param min - Minimum allowed value (default: 1)
 * @param max - Maximum allowed value (default: Number.MAX_SAFE_INTEGER)
 * @returns The validated number, or null if invalid
 */
export function validateNumericId(
  id: string | number | null | undefined,
  min: number = 1,
  max: number = Number.MAX_SAFE_INTEGER
): number | null {
  if (id === null || id === undefined) {
    return null;
  }

  const numId = typeof id === "string" ? parseInt(id, 10) : id;

  if (isNaN(numId) || numId < min || numId > max) {
    return null;
  }

  return numId;
}
