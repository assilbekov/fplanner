"use client"

import { FinancesModel, useFinancesData } from "../_hooks/useFinancesData"
import { MoneyStateModel, useMoneyStateData } from "../_hooks/useMoneyStateData";
import { CashDialog } from "./Cash";
import { InfoCard } from "./InfoCard";
import { YearsPlanningDialog } from "./YearsPlanning";

type ClientPageProps = {
  finances: FinancesModel[];
  moneyState: MoneyStateModel;
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
    moneyState,
    updateCurrentMoneyMutateAsync,
    updateYearsPlanningMutateAsync,
    updateCurrentMoneyIsLoading,
    updateYearsPlanningIsLoading,
  } = useMoneyStateData({ moneyState: props.moneyState });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          title="Cash"
          value={String(moneyState?.currentMoney || "0")}
          description="How much money in cash you currently have"
          editDialog={
            <CashDialog
              defaultValues={{ cash: moneyState?.currentMoney }}
              // TODO: Update later.
              onSubmit={v => updateCurrentMoneyMutateAsync({ currentMoney: v.cash, id: moneyState?.id || 0 })}
              isLoading={updateCurrentMoneyIsLoading}
            />
          }
        />
        <InfoCard
          title="Planning years"
          value={String(moneyState?.yearsPlanning || "10")}
          description="For how many years you want to plan"
          editDialog={
            <YearsPlanningDialog
              defaultValues={{ yearsPlanning: moneyState?.yearsPlanning }}
              // TODO: Update later.
              onSubmit={v => updateYearsPlanningMutateAsync({ yearsPlanning: v.yearsPlanning })}
              isLoading={updateYearsPlanningIsLoading}
            />
          }
        />
      </div>
    </div>
  )
}
