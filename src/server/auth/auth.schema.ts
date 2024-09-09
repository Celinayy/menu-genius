import { z } from "zod";

export const LoginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
