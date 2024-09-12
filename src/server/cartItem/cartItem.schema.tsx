import { z } from "zod";

export const CreateCartItemPayloadSchema = z.object({
  productId: z.string().uuid(),
});

export const DeleteCartItemPayloadSchema = z.object({
  productId: z.string().uuid(),
});

export const FindCartItemPayloadSchema = z.object({
  productId: z.string().uuid(),
});
