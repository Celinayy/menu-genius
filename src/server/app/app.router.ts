import { router } from "@/trpc/server";

import { authRouter } from "../auth/auth.router";
import { userRouter } from "../user/user.router";
import { productRouter } from "../product/product.router";
import { ingredientRouter } from "../ingredient/ingredient.router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  product: productRouter,
  ingredient: ingredientRouter,
});

export type AppRouter = typeof appRouter;
