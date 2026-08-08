import { createPaginatedListSchema } from "@/app/helpers/createPaginatedApiSchema";
import { z } from "zod";

export const pointTransferListItemSchema = z.object({
  id: z.number(),
  code: z.string(),
  startNumber: z.string(),
  endNumber: z.string(),
  pointName: z.string(),
  totalCount: z.number(),
  senderCountry: z.string(),
  statusId: z.number(),
  statusLabel: z.string(),
  rejectReason: z.string().optional(),
});

export const pointTransferListSchema = createPaginatedListSchema(
  pointTransferListItemSchema,
);
