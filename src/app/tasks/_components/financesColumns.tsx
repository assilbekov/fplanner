"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { InferSelectModel } from "drizzle-orm"
import { format } from "date-fns";

import { Badge } from "~/components/ui/badge"
import { finances } from "~/server/db/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
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
        <Badge variant={row.getValue("type") !== "income" ? "default" : "destructive"}>
          {row.getValue("type")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "monthlyAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly amount" />
    ),
    cell: ({ row }) => <div className="flex items-center">{row.getValue("monthlyAmount")}</div>,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start date" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {format(row.getValue("startDate"), "dd:mm:yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End date" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue("endDate") ? format(row.getValue("endDate"), "dd:mm:yyyy") : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <FinancesTableRowActions row={row} />,
  },
]
