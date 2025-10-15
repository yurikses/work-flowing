import { use } from 'react'
import { TaskContext } from '@/context/TaskContent'

export function useTasks() {
  const context = use(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a DialogProvider')
  }
  return context
}
