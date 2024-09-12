import { router } from "@/trpc/server";

import { authRouter } from "../auth/auth.router";
import { userRouter } from "../user/user.router";
import { productRouter } from "../product/product.router";
import { ingredientRouter } from "../ingredient/ingredient.router";
import { allergenRouter } from "../allergen/allergen.router";
import { cartRouter } from "../cart/cart.router";
import { cartItemRouter } from "../cartItem/cartItem.router";
import { favoritProductRouter } from "../favorit/favorit.router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  product: productRouter,
  ingredient: ingredientRouter,
  allergen: allergenRouter,
  cart: cartRouter,
  cartItem: cartItemRouter,
  favoritProduct: favoritProductRouter,
});

export type AppRouter = typeof appRouter;
