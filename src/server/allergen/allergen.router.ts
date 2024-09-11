import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { ListAllergenPayloadSchema } from "./allergen.schema";
import { router } from "@/trpc/server";

export const allergenRouter = router({
  list: protectedProcedure.input(ListAllergenPayloadSchema).query(async () => {
    return await prisma.allergen.findMany({});
  }),
});
