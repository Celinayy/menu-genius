import { router } from "@/trpc/server";
import { productProcedure } from "../product/product.procedure";
import { prisma } from "../db/db.client";

export const deskRouter = router({
  list: productProcedure.query(async () => {
    return await prisma.desk.findMany({});
  }),
});
