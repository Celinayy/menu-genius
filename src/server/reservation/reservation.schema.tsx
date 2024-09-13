import { z } from "zod";

export const CreateReservationPayloadSchema = z
  .object({
    name: z.string(),
    phone: z.string(),
    numberOfGuests: z.number().min(1).max(10),
    comment: z.string(),
    checkInDate: z.date(),
    checkOutDate: z.date().optional(),
  })
  .refine(
    (args) =>
      !args.checkOutDate ||
      args.checkInDate.getTime() < args.checkOutDate.getTime(),
    "A távozás dátuma nem lehet korábbi, mint az érkezésé!"
  );

export const FindReservationPayloadSchema = z.object({
  reservationId: z.string().uuid(),
});

export const ListReservationPayloadSchema = z.object({});

export const DeleteReservationPayloadSchema = z.object({
  reservationId: z.string().uuid(),
});
