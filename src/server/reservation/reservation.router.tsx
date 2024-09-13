import { router } from "@/trpc/server";
import { protectedProcedure } from "../auth/auth.procedure";
import {
  CreateReservationPayloadSchema,
  FindReservationPayloadSchema,
} from "./reservation.schema";
import { prisma } from "../db/db.client";
import { reservationProcedure } from "./reservation.procedure";

export const reservationRouter = router({
  create: protectedProcedure
    .input(CreateReservationPayloadSchema)
    .mutation(async (opts) => {
      const reservation = await prisma.reservation.create({
        data: {
          userId: opts.ctx.user.id,
          name: opts.input.name,
          comment: opts.input.comment,
          phone: opts.input.phone,
          numberOfGuests: opts.input.numberOfGuests,
          checkInDate: opts.input.checkInDate,
          checkOutDate: opts.input.checkOutDate,
        },
      });
      return {
        message: "Successfully created reservation!",
        reservation,
      };
    }),

  list: protectedProcedure.query(async (opts) => {
    return await prisma.reservation.findMany({
      where: {
        userId: opts.ctx.user.id,
      },
    });
  }),

  find: protectedProcedure
    .input(FindReservationPayloadSchema)
    .query(async (opts) => {
      return await prisma.reservation.findFirstOrThrow({
        where: {
          id: opts.input.reservationId,
        },
      });
    }),

  delete: reservationProcedure
    .input(FindReservationPayloadSchema)
    .mutation(async (opts) => {
      return await prisma.reservation.delete({
        where: {
          id: opts.ctx.reservation.id,
        },
      });
    }),
});
