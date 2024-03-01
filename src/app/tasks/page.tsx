import type { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { UserProfile, UserButton } from "@clerk/nextjs";



import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"
import type { MockTask } from "./data/tasks.mock"
import { mockTasks } from "./data/tasks.mock"
import { IncomeDialog } from "./components/IncomeDialog"
import { Label } from "~/components/ui/label";
import { InfoCard } from "./components/InfoCard";
import { CurrentValueDialog } from "./components/CurrentValueDialog";
import { InflationDialog } from "./components/InflationDialog";
import { FinancialOverview } from "./components/FinancialOverview";
import { YearsPlanningDialog } from "./components/YearsPlanningDialog";
import { api } from "~/trpc/server";

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

  console.log(moneyState);

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
            value="$45,231.89"
            description="How much money in cash you currently have"
            editDialog={<CurrentValueDialog />}
          />
          <InfoCard
            title="Planning years"
            value="10"
            description="For how many years you want to plan"
            editDialog={<YearsPlanningDialog />}
          />
          <InfoCard
            title="Inflation"
            value="4%"
            description="Average inflation rate"
            editDialog={<InflationDialog />}
          />
        </div>
        <FinancialOverview finances={financesData} initialCash={3000} />
        <IncomeDialog />
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
