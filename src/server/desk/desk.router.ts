import { procedure, router } from "@/trpc/server";
import { prisma } from "../db/db.client";
import { protectedProcedure } from "../auth/auth.procedure";
import { FindDeskPayloadSchema } from "./desk.schema";

export const deskRouter = router({
  list: protectedProcedure.query(async () => {
    return await prisma.desk.findMany({});
  }),

  find: procedure.input(FindDeskPayloadSchema).query(async (opts) => {
    return await prisma.desk.findUniqueOrThrow({
      where: {
        id: opts.input.deskId,
      },
    });
  }),
});
