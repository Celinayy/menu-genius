import { router } from "@/trpc/server";
import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";

import { CreateCartItemPayloadSchema } from "./cartItem.schema";

export const cartItemRouter = router({
  create: protectedProcedure
    .input(CreateCartItemPayloadSchema)
    .mutation(async (opts) => {
      const cartItem = await prisma.cartItem.create({
        data: {
          cart: {
            connectOrCreate: {
              create: {
                userId: opts.ctx.user.id,
              },
              where: {
                userId: opts.ctx.user.id,
              },
            },
          },
          product: {
            connect: {
              id: opts.input.productId,
            },
          },
        },
      });

      return {
        message: "Successfully added item to cart!",
        cartItem,
      };
    }),
});
