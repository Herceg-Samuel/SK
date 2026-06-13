import { z } from "zod";
import slugify from "slugify";

export const PostSubmissionSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title cannot exceed 80 characters")
    .trim(),

  content: z
    .string()
    .min(10, "Your post must be at least 10 characters long")
    .max(25000, "Content exceeds execution memory caps (25kb max)"), // Protect server routes from DDoS parsing load
});

// Utility wrapper to output a safe, sanitized routing slug
export function generateSafeSlug(title: string): string {
  return slugify(title, {
    lower: true, // convert to lowercase
    strict: true, // strip special characters except replacement
    trim: true,
  });
}
