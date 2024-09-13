import { router } from "@/trpc/server";
import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";

import {
  CreateCartItemPayloadSchema,
  FindCartItemPayloadSchema,
} from "./cartItem.schema";
import { cartItemProcedure } from "./cartItem.procedure";

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

  list: protectedProcedure.query(async (opts) => {
    return await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: opts.ctx.user.id,
        },
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

  delete: cartItemProcedure
    .input(FindCartItemPayloadSchema)
    .mutation(async (opts) => {
      return await prisma.cartItem.delete({
        where: {
          id: opts.ctx.cartItem.id,
        },
      });
    }),
});
