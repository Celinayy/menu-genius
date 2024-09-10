import { z } from "zod";

export const FindProductPayloadSchema = z.object({
  productId: z.string().uuid(),
});

export const ListProductPayloadSchema = z.object({
  ingredientIds: z.string().uuid().array().optional().default([]),
  search: z
    .object({
      name: z.string(),
    })
    .optional(),
});
