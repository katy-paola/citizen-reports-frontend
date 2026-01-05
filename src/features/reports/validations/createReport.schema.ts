// features/reports/schemas/createReport.schema.ts
import { z } from "zod";

export const createReportSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .min(5, "Title must be at least 5 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description cannot be empty")
    .min(10, "Description must be at least 10 characters"),
});

export type CreateReportForm = z.infer<typeof createReportSchema>;
