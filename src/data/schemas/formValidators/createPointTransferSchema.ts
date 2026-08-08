import { z } from "zod";

export const createPointTransferSchema = z.object({
  id: z.string().optional(),
  permitCode: z.string().optional(),
  receivingRegion: z.string().optional(),
  startNumber: z.number(),
  endNumber: z.number(),
  totalCount: z.number().optional().or(z.string().optional()),
  description: z.string(),
});
