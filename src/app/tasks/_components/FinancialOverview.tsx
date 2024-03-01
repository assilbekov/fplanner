"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { addMonths, differenceInMonths, format } from 'date-fns'

type Finance = {
  name: string,
  amount: number,
  startDate: Date,
  endDate: Date,
  interestRate: number
}

const formatDate = (date: Date) => {
  return format(date, 'MMM-yyyy');
}

const formatCurrency = (value: number) => `$${value}`

type FinanceChange = {
  name: string,
  total: number,
  change: number,
}

const financeToChart = (finance: Finance) => {
  const data = [];
  const monthlyInterestRate = finance.interestRate / 100 / 12;
  let currentTotal = finance.amount;
  for (let i = 0; i < differenceInMonths(finance.endDate, finance.startDate); i++) {
    const currentDate = addMonths(finance.startDate, i);
    currentTotal = currentTotal * (1 + monthlyInterestRate);
    data.push({
      name: formatDate(currentDate),
      total: currentTotal,
      change: currentTotal - finance.amount,
    })
  }
  return data;
}

const financeToChartMap = (finance: Finance): Map<string, FinanceChange> => {
  const data = new Map();
  const generatedData = financeToChart(finance);
  for (const dataPoint of generatedData) {
    data.set(dataPoint.name, dataPoint);
  }
  return data;
}

const transformFinancesIntoChart = (finances: Finance[], initialCash: number) => {
  const lowestStartDate = finances.reduce((acc, finance) => {
    return finance.startDate < acc ? finance.startDate : acc;
  }, new Date());
  const highestEndDate = finances.reduce((acc, finance) => {
    return finance.endDate > acc ? finance.endDate : acc;
  }, new Date());
  const fininancesMaps = finances.map(financeToChartMap);
  const data = [];

  
  let total = initialCash;

  for (let i = 0; i < differenceInMonths(highestEndDate, lowestStartDate); i++) {
    let currentChange = 0;
    let currentTotal = 0;
    const currentDate = addMonths(lowestStartDate, i);
    const currentName = formatDate(currentDate);
    fininancesMaps.forEach((financeMap, index) => {
      const finance = finances[index];
      if (finance && currentDate >= finance.startDate && currentDate <= finance.endDate) {
        currentChange += financeMap.get(currentName)?.change || 0;
        currentTotal += (financeMap.get(currentName)?.total || 0) - (financeMap.get(currentName)?.change || 0);
      }
    });

    total = total + currentChange + currentTotal;
    data.push({
      name: currentName,
      total: (total).toFixed(2),
    });
    
    total = total - currentTotal;
  }

  return data;
}

type FinancialOverviewProps = {
  finances: Finance[];
  initialCash: number;
}

export function FinancialOverview({ finances, initialCash }: FinancialOverviewProps) {
  console.log({ finances, initialCash, transformFinancesIntoChart: transformFinancesIntoChart(finances, initialCash) })
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={transformFinancesIntoChart(finances, initialCash)}>
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
        <Tooltip formatter={formatCurrency} cursor={{fill: "transparent"}} />
      </BarChart>
    </ResponsiveContainer>
  )
}

