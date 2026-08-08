import { createPaginatedListSchema } from "@/app/helpers/createPaginatedApiSchema";
import { z } from "zod";

export const pointInboundSubItemSchema = z.object({
  id: z.number(),
  count: z.number(),
  startNumber: z.string(),
  endNumber: z.string(),
  sendDate: z.string(),
  expiryDate: z.string(),
  activeYear: z.number(),
  exchangeType: z.string(),
  statusId: z.number(),
  statusLabel: z.string(),
  rejectReason: z.string().optional(),
});

export const pointInboundListItemSchema = z.object({
  id: z.number(),
  code: z.string(),
  senderCountry: z.string(),
  permitType: z.string(),
  givenPermitsCount: z.number(),
  remainingPermitsCount: z.number(),
  approvedCount: z.number(),
  pendingCount: z.number(),
  deficitStatus: z.string(),
  subItems: z.array(pointInboundSubItemSchema),
});

export const pointInboundListSchema = createPaginatedListSchema(
  pointInboundListItemSchema,
);

