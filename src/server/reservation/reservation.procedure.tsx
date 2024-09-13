import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { FindReservationPayloadSchema } from "./reservation.schema";

export const reservationProcedure = protectedProcedure
  .input(FindReservationPayloadSchema)
  .use(async (opts) => {
    const reservation = await prisma.reservation.findUniqueOrThrow({
      where: {
        userId: opts.ctx.user.id,
        id: opts.input.reservationId,
      },
    });

    return opts.next({
      ctx: {
        reservation,
      },
    });
  });
