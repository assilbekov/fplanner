"use client"

import { useFinancesData } from "../_hooks/useFinancesData"
import type { FinancesModel } from "../_hooks/useFinancesData"
import type { PlansModel } from "../_hooks/usePlanData";
import { usePlanData } from "../_hooks/usePlanData";
import { CashDialog } from "./Cash";
import { CreateFinanceDialog } from "./CreateFinanceDialog";
import { FinancesTable } from "./FinancesTable";
import { FinancialOverview } from "./FinancialOverview";
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
    createIsLoading,
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
          value={String(plan?.cash ?? "0")}
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
          value={String(plan?.yearsPlanning ?? "10")}
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
      {
        finances.length > 0 && plan && (
          <FinancialOverview
            finances={finances}
            yearsPlanning={plan.yearsPlanning}
            initialCash={plan.cash}
          />
        )
      }
      <CreateFinanceDialog
        isLoading={createIsLoading}
        onSubmit={createUpdateAsync}
        defaultValues={{
          type: "income",
          startDate: new Date(),
          interestRate: 0,
        }}
      />
      <FinancesTable finances={finances} />
    </div>
  )
}
