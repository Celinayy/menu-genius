import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import {
  FindProductPayloadSchema,
  ListProductPayloadSchema,
} from "./product.schema";
import { procedure, router } from "@/trpc/server";

export const productRouter = router({
  list: procedure.input(ListProductPayloadSchema).query(async (opts) => {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: opts.input.search?.name,
          mode: "insensitive",
        },
        ingredients:
          opts.input.ingredientIds.length > 0
            ? {
                some: {
                  id: {
                    in: opts.input.ingredientIds,
                  },
                },
              }
            : undefined,
        allergens:
          opts.input.allergenIds.length > 0
            ? {
                some: {
                  id: {
                    in: opts.input.allergenIds,
                  },
                },
              }
            : undefined,
      },

      include: {
        image: true,
        ingredients: true,
        allergens: true,
        favorites: true,
      },
    });
  }),

  find: procedure.input(FindProductPayloadSchema).query(async (opts) => {
    return await prisma.product.findUniqueOrThrow({
      where: {
        id: opts.input.productId,
      },
      include: {
        image: true,
        ingredients: true,
        allergens: true,
        favorites: true,
      },
    });
  }),
});
