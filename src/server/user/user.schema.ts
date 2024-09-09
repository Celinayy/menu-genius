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
  })
  .partial();

export const DeleteUserPayloadSchema = z.object({
  password: z.string().min(1),
});
