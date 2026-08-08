import {
  pointTransferListItemSchema,
  pointTransferListSchema,
} from "@/data/schemas/dtoValidations/pointTransferListSchema";
import { z } from "zod";

export type PointTransferListDTO = z.infer<typeof pointTransferListSchema>;
export type PointTransferListItemDTO = z.infer<
  typeof pointTransferListItemSchema
>;
