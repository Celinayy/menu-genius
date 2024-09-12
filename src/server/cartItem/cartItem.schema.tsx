import { z } from "zod";

export const CreateCartItemPayloadSchema = z.object({
  productId: z.string().uuid(),
});
