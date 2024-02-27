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

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="border-b flex justify-between items-center px-6 py-4">
        <Label className="text-lg font-bold">FPlanner</Label>
        <UserButton />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <IncomeDialog />
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
