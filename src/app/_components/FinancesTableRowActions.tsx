"use client"

import { useState } from "react"
import type { Row } from "@tanstack/react-table"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { api } from "~/trpc/react"
import type { FinancesModel } from "../_hooks/useFinancesData"
import { FinancePlanForm } from "./FinancePlanForm"

interface FinancesTableRowActionsProps {
  row: Row<FinancesModel>
}

export function FinancesTableRowActions({ row }: FinancesTableRowActionsProps) {
  const name: string = row.getValue("name");
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const { mutateAsync: updateAsyncMutate, isLoading: updateisLoading } = api.finance.update.useMutation({
    onSuccess: () => utils.finance.getAll.invalidate()
  });
  const { mutate: deleteMutate, isLoading: deleteIsLoading } = api.finance.delete.useMutation({
    onSuccess: () => utils.finance.getAll.invalidate()
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 active:text-white hover:text-white focus:text-white"
          disabled={deleteIsLoading}
          onClick={() => deleteMutate({ id: row.original.id })}
        >
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create financial flow</DialogTitle>
          </DialogHeader>
          <FinancePlanForm
            setOpen={setOpen}
            isLoading={updateisLoading}
            onSubmit={async (values) => {
              await updateAsyncMutate({
                id: row.original.id,
                ...values
              });
            }}
            defaultValues={{
              name,
              type: row.original.type as "income" | "expense",
              monthlyAmount: row.original.monthlyAmount,
              interestRate: row.original.interestRate,
              startDate: row.original.startDate,
              endDate: row.original.endDate ?? undefined
            }}
          />
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
