import { createPointTransferSchema } from "@/data/schemas/formValidators/createPointTransferSchema";
import { z } from "zod";

export type CreatePointTransferDSO = z.infer<typeof createPointTransferSchema>;
