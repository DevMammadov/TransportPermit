import { z } from "zod";

export const permitInfoSchema = z.object({
  id: z.string().optional(),

  permitCode: z.string().optional(),

  country: z.string().optional(),
  isDeficit: z.string().optional(),
  permitType: z.string().optional(),
  permitCategory: z.string().optional(),
});
