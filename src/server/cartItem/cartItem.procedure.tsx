import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { FindCartItemPayloadSchema } from "./cartItem.schema";

export const cartItemProcedure = protectedProcedure
  .input(FindCartItemPayloadSchema)
  .use(async (opts) => {
    const cartItem = await prisma.cartItem.findUniqueOrThrow({
      where: {
        id: opts.input.productId,
      },
    });

    return opts.next({
      ctx: {
        cartItem,
      },
    });
  });
