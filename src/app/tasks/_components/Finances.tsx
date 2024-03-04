"use client"

import { FinancesModel, useFinancesData } from "../_hooks/useFinancesData"
import { FinanceFormInfered } from "./FinancePlanForm";

type FinancesTableProps = {
  finances: FinancesModel[];
}

export const Finances = (props: FinancesTableProps) => {
  const {
    finances, 
    createUpdateAsync, 
    uptateMutateAsync,
    createIsLoading,
    uptateIsLoading
  } = useFinancesData({ finances: props.finances })

  async function onCreateSubmit(values: FinanceFormInfered) {
    createUpdateAsync(values);
  }

  async function onUpdateSubmit(values: FinanceFormInfered, id: number) {
    uptateMutateAsync({ id, ...values });
  }

  return 
}