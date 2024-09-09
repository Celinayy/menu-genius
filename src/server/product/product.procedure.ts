import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { ListProductPayloadSchema } from "./product.schema";

export const productProcedure = protectedProcedure
  .input(ListProductPayloadSchema)
  .use(async (opts) => {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id: opts.input.productId,
      },
    });

    return opts.next({
      ctx: {
        product,
      },
    });
  });
