import { router } from "@/trpc/server";

import { authRouter } from "../auth/auth.router";
import { userRouter } from "../user/user.router";
import { productRouter } from "../product/product.router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
