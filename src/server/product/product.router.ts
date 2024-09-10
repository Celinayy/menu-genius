import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { ListProductPayloadSchema } from "./product.schema";
import { router } from "@/trpc/server";

export const productRouter = router({
  list: protectedProcedure.input(ListProductPayloadSchema).query(async () => {
    return await prisma.product.findMany({
      include: {
        image: true,
      },
    });
  }),
});
