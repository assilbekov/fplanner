import { postRouter } from "~/server/api/routers/post";
import { financeRouter } from "~/server/api/routers/finances";
import { moneyStateRouter } from "~/server/api/routers/moneyStates";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  finance: financeRouter,
  moneyState: moneyStateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
