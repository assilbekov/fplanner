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
import { ClientPage } from "./_components/ClientPage";

export const metadata: Metadata = {
  title: "FPlanner",
  description: "Plan your future based on your money flow",
}

export default async function TaskPage() {
  noStore();
  const [plan, finances] = await Promise.all([
    api.plan.getFirstByUserId.query(),
    api.finance.getAll.query()
  ]);

  return (
    <>
      <div className="border-b flex justify-between items-center px-6 py-4">
        <Label className="text-lg font-bold">FPlanner</Label>
        <UserButton />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <ClientPage plan={plan!} finances={finances} />
      </div>
    </>
  )
}
