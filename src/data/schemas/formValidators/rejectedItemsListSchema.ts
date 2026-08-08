import { z } from "zod";

export const rejectedItemsListSchema = z.object({
  id: z.string().optional(),

  startNumber: z.coerce.number(),
  endNumber: z.coerce.number().optional().or(z.literal("")),

  count: z.coerce.number(),
  damageType: z.string().min(1, "Zədələnmə növünü seçin"),
  reason: z.string().min(1, "Səbəbi qeyd edin"),
});
