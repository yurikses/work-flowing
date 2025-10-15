import { useEffect, useState } from 'react'
import { columns } from '@/components/tasks/columns'
import { DataTable } from '@/components/tasks/data-table'
import { Button } from '@/components/ui/button'
import { useTasks } from '@/hooks/useTask'
import { getTasks } from '@/lib/api'

export default function TaskScreen() {
  const { tasks, setTasks } = useTasks()
  const [pageTasks, setPageTasks] = useState(tasks)

  function setPageTasksOnLoad() {
    setPageTasks(tasks)
  }
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks()
        setTasks(tasksData)
      }
      catch (error) {
        console.error('Failed to load tasks:', error)
      }
    }
    if (tasks.length === 0) {
      fetchTasks()
    }
  }, [])

  useEffect(() => {
    setPageTasksOnLoad()
  }, [tasks])

  return (
    <div>
      <div className="w-full shadow-2xl border-b-2 border-white/40">
        <button type="button" className="hover:bg-white/20 border-white h-[1.5rem] w-[1.5rem] rounded-md">
          +
        </button>
        <span>/</span>
      </div>
      <div className="w-full rounded-lg p-1 bg-black/50 flex gap-2 my-2">

        <Button className="bg-transparent hover:bg-white/30 text-red-600/90">Очистить задачи</Button>
        <Button className="bg-transparent hover:bg-white/30">Создать задачу</Button>
        <Button className="bg-transparent hover:bg-white/30">Удалить задачи</Button>
        <Button className="bg-transparent hover:bg-white/30">Удалить задачи</Button>
      </div>
      <DataTable columns={columns} data={pageTasks} />
    </div>

  )
}
