import { z } from "zod";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { moneyState } from "~/server/db/schema";

export const moneyStateRouter = createTRPCRouter({
  getFirstByUserId: publicProcedure
    .query(async ({ ctx }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      const _moneyState = ctx.db.query.moneyState.findFirst({
        where: eq(moneyState.userId, user.id),
      });
      if (!_moneyState) {
        return await ctx.db.insert(moneyState).values({
          cash: 0,
          yearsPlanning: 10,
          userId: user.id
        });
      }

      return _moneyState
    }),

  updateCashByUserId: publicProcedure
    .input(z.object({ cash: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.
        update(moneyState).
        set({ cash: input.cash }).
        where(eq(moneyState.userId, user.id));
    }),

  updateYearsPlanningByUserId: publicProcedure
    .input(z.object({ yearsPlanning: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.
        update(moneyState).
        set({ yearsPlanning: input.yearsPlanning }).
        where(eq(moneyState.userId, user.id),);
    }),

  delete: publicProcedure
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.delete(moneyState).where(eq(moneyState.userId, user.id));
    }),
});
