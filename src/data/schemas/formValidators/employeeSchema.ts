import { z } from "zod";

export const employeeSchema = z.object({
  fullName: z.string(),
  position: z.string(),
});
