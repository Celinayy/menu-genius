import { z } from "zod";

export const CreateUserPlayloadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(1),
});

export const UpdateUserPayloadSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    currentPassword: z.string().min(1),
    darkMode: z.boolean(),
    paletteMode: z.enum([
      "PINK",
      "DARK_BLUE",
      "DARK_BROWN",
      "LIGHT_BLUE",
      "PURPLE",
      "YELLOW",
      "GREEN",
      "GREY",
    ]),
  })
  .partial();

export const DeleteUserPayloadSchema = z.object({
  password: z.string().min(1),
});
