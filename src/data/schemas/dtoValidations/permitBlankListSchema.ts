import { createPaginatedListSchema } from "@/app/helpers/createPaginatedApiSchema";
import { z } from "zod";

const permitItemkSchema = z.object({
  id: z.number(),
  category: z.string(),
  code: z.string(),
  country: z.string(),
  deficiencyLevelType: z.string(),
});

const statusSchema = z.object({
  cssClass: z.string(),
  id: z.number(),
  value: z.string(),
});

export const permitBlankListItemSchema = z.object({
  id: z.number(),
  applicableYear: z.number(),
  count: z.number(),
  endNumber: z.number(),
  exchangeType: z.number(),
  expirationDate: z.string(),
  permit: permitItemkSchema,
  startNumber: z.number(),
  status: statusSchema,
});

export const permitBlankListSchema = createPaginatedListSchema(
  permitBlankListItemSchema,
);

export const permitBlankItemSchema = z.object({
  id: z.number(),
  applicableYear: z.number(),
  count: z.number(),
});
