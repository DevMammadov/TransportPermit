import { z } from "zod";

export const fileSchema = z.object({
  fileBytes: z.string(),
  fileType: z.string(),
  fileName: z.string(),
});
