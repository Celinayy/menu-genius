import { z } from "zod";

export const CreateFavoritProductPayloadSchema = z.object({
  productId: z.string().uuid(),
});

export const ListFavoritProductPayloadSchema = z.object({});

export const DeleteFavoritProductPayloadSchema = z.object({
  productId: z.string().uuid(),
});

export const FindFavoritProductPayloadSchema = z.object({
  productId: z.string().uuid(),
});
