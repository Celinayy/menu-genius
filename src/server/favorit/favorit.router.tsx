import { router } from "@/trpc/server";
import { protectedProcedure } from "../auth/auth.procedure";
import {
  CreateFavoritProductPayloadSchema,
  FindFavoritProductPayloadSchema,
} from "./favorit.schema";
import { prisma } from "../db/db.client";
import { favoritProductProcedure } from "./favorit.procedure";

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

  list: protectedProcedure.query(async (opts) => {
    return await prisma.favorite.findMany({
      where: {
        userId: opts.ctx.user.id,
      },
      include: {
        product: {
          include: {
            image: true,
          },
        },
      },
    });
  }),

  delete: favoritProductProcedure
    .input(FindFavoritProductPayloadSchema)
    .mutation(async (opts) => {
      return await prisma.favorite.delete({
        where: {
          productId_userId: {
            productId: opts.ctx.favoritProduct.productId,
            userId: opts.ctx.favoritProduct.userId,
          },
        },
      });
    }),
});
