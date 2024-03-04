import { postRouter } from "~/server/api/routers/post";
import { financeRouter } from "~/server/api/routers/finances";
import { planRouter } from "~/server/api/routers/plan";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  finance: financeRouter,
  plan: planRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
