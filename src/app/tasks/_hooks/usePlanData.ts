import { InferSelectModel } from "drizzle-orm";
import { plans } from "~/server/db/schema";
import { api } from "~/trpc/react"

export type PlansModel = InferSelectModel<typeof plans>;

export const usePlanData = ({ plan }: { plan: PlansModel }) => {
  const { data, refetch } = api.plan.getFirstByUserId.useQuery(undefined, { initialData: plan });
  const {
    mutateAsync: updateCashMutateAsync,
    isLoading: updateCashIsLoading
  } = api.plan.updateCashByUserId.useMutation({
    onSuccess: () => refetch(),
  });
  const {
    mutateAsync: updateYearsPlanningMutateAsync,
    isLoading: updateYearsPlanningIsLoading
  } = api.plan.updateYearsPlanningByUserId.useMutation({
    onSuccess: () => refetch(),
  });

  return {
    plan: data,
    updateCashMutateAsync,
    updateCashIsLoading,
    updateYearsPlanningMutateAsync,
    updateYearsPlanningIsLoading
  }
}