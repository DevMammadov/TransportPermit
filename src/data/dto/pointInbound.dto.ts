import {
  pointInboundListItemSchema,
  pointInboundListSchema,
  pointInboundSubItemSchema,
} from "@/data/schemas/dtoValidations/pointInboundSchema";
import z from "zod";

export type PointInboundListDTO = z.infer<typeof pointInboundListSchema>;
export type PointInboundListItemDTO = z.infer<
  typeof pointInboundListItemSchema
>;
export type PointInboundSubItemDTO = z.infer<typeof pointInboundSubItemSchema>;
