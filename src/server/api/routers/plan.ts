import { z } from "zod";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { plans } from "~/server/db/schema";

export const planRouter = createTRPCRouter({
  getFirstByUserId: publicProcedure
    .query(async ({ ctx }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      const plan = await ctx.db.query.plans.findFirst({
        where: eq(plans.userId, user.id),
      });
      if (!plan) {
        await ctx.db.insert(plans).values({
          cash: 0,
          yearsPlanning: 10,
          userId: user.id
        })
        return ctx.db.query.plans.findFirst({
          where: eq(plans.userId, user.id),
        });
      }

      return plan
    }),

  updateCashByUserId: publicProcedure
    .input(z.object({ cash: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.
        update(plans).
        set({ cash: input.cash }).
        where(eq(plans.userId, user.id));
    }),

  updateYearsPlanningByUserId: publicProcedure
    .input(z.object({ yearsPlanning: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.
        update(plans).
        set({ yearsPlanning: input.yearsPlanning }).
        where(eq(plans.userId, user.id),);
    }),

  delete: publicProcedure
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      await ctx.db.delete(plans).where(eq(plans.userId, user.id));
    }),
});
