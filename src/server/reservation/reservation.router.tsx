import { router } from "@/trpc/server";
import { protectedProcedure } from "../auth/auth.procedure";
import {
  CreateReservationPayloadSchema,
  FindReservationPayloadSchema,
} from "./reservation.schema";
import { prisma } from "../db/db.client";
import { reservationProcedure } from "./reservation.procedure";
import { DeskService } from "../desk/desk.service";
import moment from "moment";

const deskService = new DeskService();

export const reservationRouter = router({
  create: protectedProcedure
    .input(CreateReservationPayloadSchema)
    .mutation(async (opts) => {
      const desk = await deskService.findFree({
        from: opts.input.checkInDate,
        to: opts.input.checkOutDate
          ? opts.input.checkOutDate
          : moment(opts.input.checkInDate).endOf("date").toDate(),
        capacity: opts.input.numberOfGuests,
      });
      if (!desk) {
        throw new Error("A kívánt időben nincs szabad asztal!");
      }
      const reservation = await prisma.reservation.create({
        data: {
          userId: opts.ctx.user.id,
          name: opts.input.name,
          comment: opts.input.comment,
          phone: opts.input.phone,
          numberOfGuests: opts.input.numberOfGuests,
          checkInDate: opts.input.checkInDate,
          checkOutDate: opts.input.checkOutDate,
          deskId: desk.id,
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
      orderBy: {
        createdAt: "desc",
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
