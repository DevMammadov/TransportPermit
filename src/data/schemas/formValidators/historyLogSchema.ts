import { z } from "zod";

export const historyLogSchema = z.object({
  id: z.string().optional(),
  date: z.string(),
  time: z.string(),
  statusLabel: z.string(),
  statusId: z.number(),
  user: z.object({
    fullName: z.string(),
    company: z.string(),
    position: z.string(),
  }),
  messageCode: z.string().optional(),
  messageText: z.string().optional(),
});
