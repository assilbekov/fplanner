"use client"

import { FinancesModel, useFinancesData } from "../_hooks/useFinancesData"
import { PlansModel, usePlanData } from "../_hooks/usePlanData";
import { CashDialog } from "./Cash";
import { InfoCard } from "./InfoCard";
import { YearsPlanningDialog } from "./YearsPlanning";

type ClientPageProps = {
  finances: FinancesModel[];
  plan: PlansModel;
}

export const ClientPage = (props: ClientPageProps) => {
  const {
    finances,
    createUpdateAsync,
    uptateMutateAsync,
    createIsLoading,
    uptateIsLoading
  } = useFinancesData({ finances: props.finances });
  const {
    plan,
    updateCashIsLoading,
    updateCashMutateAsync,
    updateYearsPlanningMutateAsync,
    updateYearsPlanningIsLoading,
  } = usePlanData({ plan: props.plan });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          title="Cash"
          value={String(plan?.cash || "0")}
          description="How much money in cash you currently have"
          editDialog={
            <CashDialog
              defaultValues={{ cash: plan?.cash }}
              onSubmit={updateCashMutateAsync}
              isLoading={updateCashIsLoading}
            />
          }
        />
        <InfoCard
          title="Planning years"
          value={String(plan?.yearsPlanning || "10")}
          description="For how many years you want to plan"
          editDialog={
            <YearsPlanningDialog
              defaultValues={{ yearsPlanning: plan?.yearsPlanning }}
              onSubmit={updateYearsPlanningMutateAsync}
              isLoading={updateYearsPlanningIsLoading}
            />
          }
        />
      </div>
    </div>
  )
}
