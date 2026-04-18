import { createTRPCRouter } from "../init";
import { checkoutRouter } from "./checkout";
import { orderRouter } from "./order";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  checkout: checkoutRouter,
  order: orderRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
