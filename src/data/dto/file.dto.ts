import { fileSchema } from "@/data/schemas/dtoValidations/fileSchema";
import { z } from "zod";

export type FileDTO = z.infer<typeof fileSchema>;
