import { rejectedItemsListSchema } from "@/data/schemas/formValidators/rejectedItemsListSchema";
import { z } from "zod";

export type RejectedItemsListDSO = z.infer<typeof rejectedItemsListSchema>;