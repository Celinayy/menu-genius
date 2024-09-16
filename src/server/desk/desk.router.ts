import { router } from "@/trpc/server";
import { prisma } from "../db/db.client";
import { protectedProcedure } from "../auth/auth.procedure";

export const deskRouter = router({
  list: protectedProcedure.query(async () => {
    return await prisma.desk.findMany({});
  }),
});
