import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { FindReservationPayloadSchema } from "./reservation.router";

export const reservationProcedure = protectedProcedure
  .input(FindReservationPayloadSchema)
  .use(async (opts) => {
    const reservation = await prisma.reservation.findUniqueOrThrow({
      where: {
        id: opts.input.userId,
      },
    });

    return opts.next({
      ctx: {
        reservation,
      },
    });
  });
