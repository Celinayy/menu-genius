import { z } from "zod";

export const CreateFavoritProductPayloadSchema = z.object({
  productId: z.string().uuid(),
});
