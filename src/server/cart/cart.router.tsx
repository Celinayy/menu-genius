import { prisma } from "../db/db.client";
import { protectedProcedure } from "../auth/auth.procedure";
import {
  CreateCartPayloadSchema,
  DeleteCartPayloadSchema,
} from "./cart.schema";
import { router } from "@/trpc/server";

export const cartRouter = router({
  create: protectedProcedure
    .input(CreateCartPayloadSchema)
    .mutation(async (opts) => {
      const cart = await prisma.cart.create({
        data: {
          userId: opts.ctx.user.id,
        },
      });

      return {
        message: "Successfully created cart!",
        cart,
      };
    }),

  delete: protectedProcedure
    .input(DeleteCartPayloadSchema)
    .mutation(async () => {
      return await prisma.cartItem.deleteMany({});
    }),
});
