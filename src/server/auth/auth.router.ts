import { procedure, router } from "@/trpc/server";
import { LoginPayloadSchema } from "./auth.schema";
import { prisma } from "../db/db.client";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { env } from "@/env";

export const authRouter = router({
  login: procedure.input(LoginPayloadSchema).mutation(async (opts) => {
    const user = await prisma.user.findUnique({
      where: {
        email: opts.input.email,
      },
    });
    if (!user) {
      throw new Error("Invalid email or password!");
    }
    const isPasswordCorrect = await bcrypt.compare(
      opts.input.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password!");
    }

    return {
      accessToken: jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        env.SECRET_KEY
      ),
    };
  }),
});
