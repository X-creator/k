import { z } from "zod";

const TIME_OFFSET = "+03:00";

const TagItemSchema = z.object({
  value: z.string().trim().min(1),
  count: z.number().int().nonnegative(),
});

const TrafficItemSchema = z.object({
  value: z.string().trim().min(1),
  count: z.number().nonnegative(),
});

export const SnippetNewsSchema = z.object({
  ID: z.number().int().positive(),
  TI: z.string().trim().min(1),
  AB: z.string().trim().min(1),
  URL: z.string().url(),
  DOM: z.string(),
  DP: z.preprocess(
    (date) => (typeof date !== "string" ? date : new Date(`${date}${TIME_OFFSET}`).toISOString()),
    z.string().datetime(),
  ),
  LANG: z.string().trim().min(2),
  REACH: z.number().int().nonnegative(),
  KW: z.array(TagItemSchema),
  AU: z.string().trim().min(1).array(),
  CNTR: z.string().trim().min(2),
  CNTR_CODE: z.string().trim().min(2),
  SENT: z.union([z.literal("positive"), z.literal("negative"), z.literal("neutral")]),
  TRAFFIC: z.array(TrafficItemSchema),
  FAV: z.string(),
  HIGHLIGHTS: z.string().trim().min(1).array(),
});

export type SnippetNews = z.infer<typeof SnippetNewsSchema>;
