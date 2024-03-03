import type { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { UserProfile, UserButton } from "@clerk/nextjs";
import { unstable_noStore as noStore } from 'next/cache';



import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { UserNav } from "./_components/user-nav"
import { taskSchema } from "./data/schema"
import type { MockTask } from "./data/tasks.mock"
import { mockTasks } from "./data/tasks.mock"
import { CreateFinanceDialog } from "./_components/CreateFinanceDialog"
import { Label } from "~/components/ui/label";
import { InfoCard } from "./_components/InfoCard";
import { CurrentValueDialog } from "./_components/CurrentValueDialog";
import { InflationDialog } from "./_components/InflationDialog";
import { FinancialOverview } from "./_components/FinancialOverview";
import { YearsPlanningDialog } from "./_components/YearsPlanningDialog";
import { api } from "~/trpc/server";
import { FinancesTable } from "./_components/FinancesTable";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const tasks = await new Promise<MockTask[]>(res => {
    setTimeout(() => {
      res(mockTasks)
    }, 2000)
  });

  return z.array(taskSchema).parse(tasks);
}

const year = 24 * 60 * 60 * 1000 * 365;

const financesData = [{
  name: "Finances",
  amount: 1000,
  startDate: new Date("2021-01-01"),
  endDate: new Date("2021-06-06"),
  interestRate: 10,
}, {
  name: "Finances",
  amount: 1000,
  startDate: new Date("2024-06-06"),
  endDate: new Date("2026-01-01"),
  interestRate: 10,
}, {
  name: "Finances",
  amount: -1000,
  startDate: new Date("2022-01-01"),
  endDate: new Date("2023-04-04"),
  interestRate: 10,
}]

export default async function TaskPage() {
  const tasks = await getTasks()
  const moneyState = await api.moneyState.getFirstByUserId.query();
  const finances = await api.finance.getAll.query();

  //console.log(moneyState);

  return (
    <>
      <div className="border-b flex justify-between items-center px-6 py-4">
        <Label className="text-lg font-bold">FPlanner</Label>
        <UserButton />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Cash"
            value={String(moneyState?.currentMoney || "0")}
            description="How much money in cash you currently have"
            editDialog={<CurrentValueDialog />}
          />
          <InfoCard
            title="Planning years"
            value={String(moneyState?.yearsPlanning || "10")}
            description="For how many years you want to plan"
            editDialog={<YearsPlanningDialog />}
          />
          <InfoCard
            title="Inflation"
            value={String(moneyState?.inflation || "0")}
            description="Average inflation rate"
            editDialog={<InflationDialog />}
          />
        </div>
        {finances.map((finance) => (
          <div key={finance.id}>
            <p>{finance.name}</p>
            <p>{finance.amount}</p>
            <p>{JSON.stringify(finance.startDate)}</p>
            <p>{JSON.stringify(finance.endDate)}</p>
            <p>{finance.userId}</p>
          </div>
        ))}
        <FinancialOverview finances={financesData} initialCash={3000} />
        <CreateFinanceDialog />
        <FinancesTable finances={finances} />
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
