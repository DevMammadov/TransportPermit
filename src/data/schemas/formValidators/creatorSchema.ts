import { z } from "zod";

export const creatorSchema = z.object({
  fullName: z.string(),
  createdAt: z.string(), 
});