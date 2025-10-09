"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
    id: string
    name: string
    description: string
    status: boolean
    dueDate: Date
}

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",

        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Статус",
    },
    {
        accessorKey: "name",
        header: "Название задачи",
    },
    {
        accessorKey: "description",
        header: "Описание",
    },
    {
        accessorKey: "dueDate",
        header: "Дедлайн",
    },
]