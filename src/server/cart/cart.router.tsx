import { procedure, router } from "@/trpc/server";
import { prisma } from "../db/db.client";
import { protectedProcedure } from "../auth/auth.procedure";
import { CreateCartPayloadSchema } from "./cart.schema";

export const cartRouter = router({
  create: protectedProcedure
    .input(CreateCartPayloadSchema)
    .mutation(async (opts) => {
      const cart = await prisma.cart.create({
        data: {
          userId: opts.input.userId,
        },
      });

      return {
        message: "Successfully added cart!",
        cart,
      };
    }),
});
