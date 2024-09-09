import { env } from "@/env";
import { procedure } from "@/trpc/server";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "../db/db.client";

export const protectedProcedure = procedure.use(async (opts) => {
  if (opts.ctx.accessToken) {
    //@ts-ignore
    const { id } = jsonwebtoken.verify(opts.ctx.accessToken, env.SECRET_KEY);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return opts.next({
      ctx: {
        user,
      },
    });
  } else {
    throw new Error("You must be logged in to view this page!");
  }
});
