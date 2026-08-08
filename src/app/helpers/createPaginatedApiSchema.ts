import { z } from "zod";

export function createPaginatedListSchema<T extends z.ZodTypeAny>(
  itemSchema: T,
) {
  return z.object({
    pageIndex: z.number(),
    pageSize: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
    indexFrom: z.number(),
    items: z.array(itemSchema),
    hasPreviousPage: z.boolean().optional(),
    hasNextPage: z.boolean().optional(),
  });
}
