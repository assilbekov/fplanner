import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { FinancePlanForm } from "./FinancePlanForm"

export function IncomeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Share</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create financial flow</DialogTitle>
        </DialogHeader>
        <FinancePlanForm />
      </DialogContent>
    </Dialog>
  )
}