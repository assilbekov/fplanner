import type { Metadata } from "next"
import { UserButton } from "@clerk/nextjs";
import { unstable_noStore as noStore } from 'next/cache';

import { Label } from "~/components/ui/label";
import { api } from "~/trpc/server";
import { ClientPage } from "./_components/ClientPage";

export const metadata: Metadata = {
  title: "FPlanner",
  description: "Plan your future based on your money flow",
}

export default async function Page() {
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
