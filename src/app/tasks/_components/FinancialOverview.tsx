"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { addMonths, addYears, differenceInMonths, differenceInYears, format } from 'date-fns'
import type { FinancesModel } from "../_hooks/useFinancesData";

const formatDate = (date: Date) => {
  return format(date, 'MMM-yyyy');
}

const formatCurrency = (value: number) => `$${value}`

const makeData = (finances: FinancesModel[], initialCash: number, yearsPlanning: number) => {
  const lowestStartDate = finances.reduce((acc, finance) => {
    return finance.startDate < acc ? finance.startDate : acc;
  }, new Date());
  const finalEndDate = addYears(new Date(), yearsPlanning);
  const data = [];

  let lastTotal = initialCash;

  for (let i = 0; i < differenceInMonths(finalEndDate, lowestStartDate); i++) {
    const currentDate = addMonths(lowestStartDate, i);
    const currentName = formatDate(currentDate);

    for (const finance of finances) {
      if (currentDate >= finance.startDate && (!finance?.endDate || currentDate <= finance.endDate)) {
        const yearsPassed = differenceInYears(currentDate, finance.startDate);
        const monthlyAmount = yearsPassed < 1 ?
          finance.monthlyAmount :
          finance.monthlyAmount * Math.pow(1 + finance.interestRate / yearsPassed, yearsPassed)
        const monthlyAmountWithSign = finance.type === "income" ? monthlyAmount : -monthlyAmount;
        lastTotal += monthlyAmountWithSign;
      }
    }

    data.push({
      name: currentName,
      total: lastTotal,
    });
  }

  return data;
}

type FinancialOverviewProps = {
  finances: FinancesModel[];
  initialCash: number;
  yearsPlanning: number;
}

export function FinancialOverview({ finances, initialCash, yearsPlanning }: FinancialOverviewProps) {
  if (!finances.length) return null;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={makeData(finances, initialCash, yearsPlanning)}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatCurrency}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Tooltip formatter={formatCurrency} cursor={{ fill: "transparent" }} />
      </BarChart>
    </ResponsiveContainer>
  )
}

