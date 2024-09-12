import { router } from "@/trpc/server";
import { protectedProcedure } from "../auth/auth.procedure";
import { CreateFavoritProductPayloadSchema } from "./favorit.schema";
import { prisma } from "../db/db.client";

export const favoritProductRouter = router({
  create: protectedProcedure
    .input(CreateFavoritProductPayloadSchema)
    .mutation(async (opts) => {
      const favoritProduct = await prisma.favorite.create({
        data: {
          userId: opts.ctx.user.id,
          productId: opts.input.productId,
        },
      });

      return {
        message: "Successfully added product to favorites!",
        favoritProduct,
      };
    }),
});
