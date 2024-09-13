import { procedure, router } from "@/trpc/server";
import {
  CreateUserPlayloadSchema,
  DeleteUserPayloadSchema,
  UpdateUserPayloadSchema,
} from "./user.schema";
import { prisma } from "../db/db.client";
import bcrypt from "bcryptjs";
import { protectedProcedure } from "../auth/auth.procedure";

export const userRouter = router({
  create: procedure.input(CreateUserPlayloadSchema).mutation(async (opts) => {
    const isAlreadyUsedUserEmail = await prisma.user.findUnique({
      where: {
        email: opts.input.email,
      },
    });

    if (isAlreadyUsedUserEmail) {
      throw new Error("Already used email");
    }

    await prisma.user.create({
      data: {
        name: opts.input.name,
        email: opts.input.email,
        password: await bcrypt.hash(opts.input.password, 10),
        phone: opts.input.phone,
      },
    });

    return {
      message: "Successfully registration!",
    };
  }),

  find: protectedProcedure.query((opts) => opts.ctx.user),

  update: protectedProcedure
    .input(UpdateUserPayloadSchema)
    .mutation(async (opts) => {
      if (opts.input.password) {
        const isCurrentPasswordCorrect =
          !!opts.input.currentPassword &&
          (await bcrypt.compare(
            opts.input.currentPassword,
            opts.ctx.user.password
          ));

        if (!isCurrentPasswordCorrect) {
          throw new Error("Invalid current password!");
        }
      }

      const user = await prisma.user.update({
        where: {
          id: opts.ctx.user.id,
        },
        data: {
          name: opts.input.name,
          email: opts.input.email,
          password: opts.input.password
            ? await bcrypt.hash(opts.input.password, 10)
            : undefined,
          darkMode: opts.input.darkMode,
          paletteMode: opts.input.paletteMode,
        },
      });

      return {
        message: "Successfully updated user!",
        user,
      };
    }),

  delete: protectedProcedure
    .input(DeleteUserPayloadSchema)
    .mutation(async (opts) => {
      const isCorrectPassword = await bcrypt.compare(
        opts.input.password,
        opts.ctx.user.password
      );

      if (!isCorrectPassword) {
        throw new Error("Invalid password!");
      }

      const user = await prisma.user.delete({
        where: {
          id: opts.ctx.user.id,
        },
      });
      return {
        message: "Successfully deleted user!",
        user,
      };
    }),
});
