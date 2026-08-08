import { z } from "zod";

export const quotaInfoSchema = z.object({
  id: z.string().optional(),
  permitId: z.number().optional(),
  country: z.number().optional(),
  deficiencyLevelType: z.number().optional(),
  permitType: z.number().optional(),
  permitCategory: z.number().optional(),
  expirationDate: z.string(),
  applicableYear: z.number(),
  startNumber: z.number(),
  endNumber: z.number(),
  totalCount: z.number().optional().or(z.string().optional()),
  exchangeTypeId: z.number().optional(),
  stationId: z.number().optional(),
  description: z.string(),
});
