import { InferSelectModel } from "drizzle-orm";
import { moneyState } from "~/server/db/schema";
import { api } from "~/trpc/react"

export type MoneyStateModel = InferSelectModel<typeof moneyState>;

export const useMoneyStateData = ({ moneyState }: { moneyState: MoneyStateModel }) => {
  const { data, refetch } = api.moneyState.getFirstByUserId.useQuery(undefined, { initialData: moneyState });
  const {
    mutateAsync: updateInflationMutateAsync,
    isLoading: updateInflationIsLoading
  } = api.moneyState.updateInflation.useMutation({
    onSuccess: () => refetch(),
  });
  const {
    mutateAsync: updateCurrentMoneyMutateAsync,
    isLoading: updateCurrentMoneyIsLoading
  } = api.moneyState.updateCurrentMoney.useMutation({
    onSuccess: () => refetch(),
  });
  const {
    mutateAsync: updateYearsPlanningMutateAsync,
    isLoading: updateYearsPlanningIsLoading
  } = api.moneyState.updateYearsPlanning.useMutation({
    onSuccess: () => refetch(),
  });

  return {
    moneyState: data,
    updateInflationMutateAsync,
    updateInflationIsLoading,
    updateCurrentMoneyMutateAsync,
    updateCurrentMoneyIsLoading,
    updateYearsPlanningMutateAsync,
    updateYearsPlanningIsLoading
  }
}