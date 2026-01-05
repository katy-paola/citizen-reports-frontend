import { z } from "zod";

export const updateReportSchema = z.object({
  status: z.enum(["pending", "process", "resolved"]),
});

export type UpdateReportForm = z.infer<typeof updateReportSchema>;
