"use client"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { FinancePlanForm, FinancePlanFormProps } from "./FinancePlanForm"
import { use, useState } from "react"

type CreateFinanceDialogProps = Omit<FinancePlanFormProps, "setOpen">;

export function CreateFinanceDialog(props: CreateFinanceDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add money flow</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create financial flow</DialogTitle>
        </DialogHeader>
        <FinancePlanForm setOpen={setOpen} {...props} />
      </DialogContent>
    </Dialog>
  )
}