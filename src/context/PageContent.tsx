import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

export interface Page {
  name: string
}

interface PageContextType {
  currentPage: string
  setCurrentPage: (name: string) => void
  pages: Page[]
}

export const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({ children }: { children: ReactNode }) {
  const pages = [
    { name: 'tasks' },
    { name: 'habits' },
  ]

  const [currentPage, setCurrentPage] = useState('tasks')

  return (
    <PageContext value={{ currentPage, setCurrentPage, pages }}>
      {children}
    </PageContext>
  )
}
