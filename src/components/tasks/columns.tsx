'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/tableContent/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useTasks } from '@/hooks/useTask'
import { updateTaskStatus } from '@/lib/api'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Task {
  id: string
  title: string
  description: string
  isActive: boolean
  dueDate: Date
}

// Создаем компонент для ячейки чекбокса
function CheckboxCell({ row }: { row: any }) {
  const { updateTask } = useTasks()
  const task = row.original

  const handleCheckedChange = async (checked: boolean) => {
    try {
      await updateTaskStatus({
        taskId: Number(task.id),
        status: !checked,
      })

      const newTask = { ...task, isActive: !checked }
      updateTask(newTask)
    }
    catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  return (
    <Checkbox
      checked={!task.isActive}
      disabled={!task.isActive}
      onCheckedChange={handleCheckedChange}
    />
  )
}

export const columns: ColumnDef<Task>[] = [

  {
    id: 'statusBadge',
    accessorKey: 'isActive',
    cell: ({ row }) => (

      <StatusBadge isActive={!row.original.isActive} />

    ),
    header: 'Статус',

  },
  {
    accessorKey: 'title',
    header: 'Название задачи',
  },
  {
    accessorKey: 'description',
    header: 'Описание',
  },
  {
    accessorKey: 'dueDate',
    cell: ({ row }) => (
      Intl.DateTimeFormat('ru-RU').format(new Date(row.original.dueDate))
    ),
    header: 'Дедлайн',
  },
  {
    id: 'setDone',
    cell: ({ row }) => <CheckboxCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
]
