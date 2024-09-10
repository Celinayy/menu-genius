import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { ListProductPayloadSchema } from "./product.schema";
import { router } from "@/trpc/server";

export const productRouter = router({
  list: protectedProcedure
    .input(ListProductPayloadSchema)
    .query(async (opts) => {
      return await prisma.product.findMany({
        where: {
          ingredients:
            opts.input.ingredientIds.length > 0
              ? {
                  every: {
                    id: {
                      in: opts.input.ingredientIds,
                    },
                  },
                }
              : undefined,
        },
        include: {
          image: true,
          ingredients: true,
          allergens: true,
        },
      });
    }),
});
