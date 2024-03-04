"use client"

import { FinancesModel, useFinancesData } from "../_hooks/useFinancesData"
import { MoneyStateModel, useMoneyStateData } from "../_hooks/useMoneyStateData";
import { InfoCard } from "./InfoCard";

type ClientPageProps = {
  finances: FinancesModel[];
  moneyState: MoneyStateModel;
}

export const ClientPage = (props: ClientPageProps) => {
  const { finances } = useFinancesData({ finances: props.finances });
  const { moneyState } = useMoneyStateData({ moneyState: props.moneyState });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    </div>
  )
}
