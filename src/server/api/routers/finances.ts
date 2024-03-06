import { z } from "zod";
import { currentUser } from "@clerk/nextjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { finances } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const createFinancePlanFormSchema = z.object({
  name: z.string(),
  type: z.enum(["income", "expense"]),
  monthlyAmount: z.number(),
  interestRate: z.number(),
  startDate: z.date(),
  endDate: z.date().optional(),
})

export const financeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.finances.findMany({
      orderBy: (finances, { desc }) => [desc(finances.updatedAt)],
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.finances.findFirst({
        where: eq(finances.id, input.id),
      });
    }),

  create: publicProcedure
    .input(createFinancePlanFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.insert(finances).values({ ...input, userId: user.id });
    }),

  update: publicProcedure
    .input(z.object({ id: z.number() }).merge(createFinancePlanFormSchema))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.update(finances).set({ ...input, userId: user.id }).where(eq(finances.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(finances).where(eq(finances.id, input.id));
    }),
});

