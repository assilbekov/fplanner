import { z } from "zod";
import { currentUser } from "@clerk/nextjs";
import { createFinancePlanFormSchema } from "~/app/tasks/components/FinancePlanForm";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { moneyState } from "~/server/db/schema";
import { eq } from "drizzle-orm";



export const moneyStateRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.moneyState.findMany({
      orderBy: (moneyState, { desc }) => [desc(moneyState.updatedAt)],
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.moneyState.findFirst({
        where: eq(moneyState.id, input.id),
      });
    }),

  create: publicProcedure
    .input(createFinancePlanFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.insert(moneyState).values({ ...input, userId: user.id });
    }),

  updateInflation: publicProcedure
    .input(z.object({ id: z.number(), inflation: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      const state = await ctx.db.query.moneyState.findFirst({
        where: eq(moneyState.id, input.id),
      })
      if (!state) {
        await ctx.db.insert(moneyState).values({ inflation: input.inflation, currentMoney: 0, userId: user.id });
        return;
      }

      await ctx.db.update(moneyState).set({ inflation: input.inflation }).where(eq(moneyState.id, input.id));
    }),

  updateCurrentMoney: publicProcedure
    .input(z.object({ id: z.number(), currentMoney: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }

      const state = await ctx.db.query.moneyState.findFirst({
        where: eq(moneyState.id, input.id),
      })
      if (!state) {
        await ctx.db.insert(moneyState).values({ currentMoney: input.currentMoney, inflation: 3.4, userId: user.id });
        return;
      }

      await ctx.db.update(moneyState).set({ currentMoney: input.currentMoney }).where(eq(moneyState.id, input.id));
    }),

  update: publicProcedure
    .input(z.object({ id: z.number() }).merge(createFinancePlanFormSchema))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.update(moneyState).set({ ...input, userId: user.id }).where(eq(moneyState.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(moneyState).where(eq(moneyState.id, input.id));
    }),
});
