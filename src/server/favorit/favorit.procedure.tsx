import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { FindFavoritProductPayloadSchema } from "./favorit.schema";

export const favoritProductProcedure = protectedProcedure
  .input(FindFavoritProductPayloadSchema)
  .use(async (opts) => {
    const favoritProduct = await prisma.favorite.findUniqueOrThrow({
      where: {
        id: opts.input.productId,
      },
    });

    return opts.next({
      ctx: {
        favoritProduct,
      },
    });
  });
