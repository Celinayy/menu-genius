import { PrismaClient } from "@prisma/client";

declare var global: typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient = global.prisma ?? new PrismaClient();

if (!global.prisma) {
  global.prisma = prisma;
}
