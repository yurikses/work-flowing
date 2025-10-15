import type { ReactNode } from 'react'
import type { Task } from '../components/tasks/columns'

import { createContext, useState } from 'react'

interface TaskContentType {
  tasks: Task[]
  addTasks: (newTasks: Task[]) => void
  updateTask: (updatedTask: Task) => void
  setTasks: (tasks: Task[]) => void

}

export const TaskContext = createContext<TaskContentType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const addTasks = (newTasks: Task[]) => {
    setTasks(prev => [...prev, ...newTasks])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  return (
    <TaskContext value={{ tasks, addTasks, updateTask, setTasks }}>
      {children}
    </TaskContext>
  )
}
