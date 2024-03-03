"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "~/components/ui/badge"
import { finances } from "~/server/db/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { InferSelectModel } from "drizzle-orm"
import { FinancesTableRowActions } from "./FinancesTableRowActions"

export const financesColumns: ColumnDef<InferSelectModel<typeof finances>>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("name")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        <Badge variant="outline">{row.getValue("type")}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => <div className="flex items-center">{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start date" />
    ),
    cell: ({ row }) => <div className="flex items-center">{JSON.stringify(row.getValue("startDate"))}</div>,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End date" />
    ),
    cell: ({ row }) => <div className="flex items-center">{JSON.stringify(row.getValue("endDate") || "-")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <FinancesTableRowActions row={row} />,
  },
]
