import { z } from "zod";

export const CreateReservationProductPayloadSchema = z.object({
  reservationId: z.string().uuid(),
});

export const FindReservationPayloadSchema = z.object({
  userId: z.string().uuid(),
});

export const ListReservationPayloadSchema = z.object({});

export const DeleteReservationProductPayloadSchema = z.object({
  reservationId: z.string().uuid(),
});
