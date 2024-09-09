import { z } from "zod";

export const ListProductPayloadSchema = z.object({
  productId: z.string().uuid().optional(),
});
