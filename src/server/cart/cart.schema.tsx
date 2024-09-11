import { z } from "zod";

export const CreateCartPayloadSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});
