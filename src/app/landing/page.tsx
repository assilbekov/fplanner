import type { Metadata } from "next"

import { Label } from "~/components/ui/label";

export const metadata: Metadata = {
  title: "FPlanner",
  description: "Plan your future based on your money flow",
}

export default async function Page() {
  return (
    <>
      <div className="border-b flex justify-between items-center px-6 py-4">
        <Label className="text-lg font-bold">FPlanner</Label>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      </div>
    </>
  )
}
