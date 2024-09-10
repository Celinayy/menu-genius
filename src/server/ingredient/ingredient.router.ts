import { protectedProcedure } from "../auth/auth.procedure";
import { prisma } from "../db/db.client";
import { ListIngredientPayloadSchema } from "./ingredient.schema";
import { router } from "@/trpc/server";

export const ingredientRouter = router({
  list: protectedProcedure
    .input(ListIngredientPayloadSchema)
    .query(async () => {
      return await prisma.ingredient.findMany({});
    }),
});
