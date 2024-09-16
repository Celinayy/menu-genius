import { z } from "zod";

export const FindFreeDeskPayloadSchema = z.object({
  capacity: z.number().int().positive(),
  from: z.date(),
  to: z.date(),
});

export type FindFreeDeskPayloadType = z.infer<typeof FindFreeDeskPayloadSchema>;
