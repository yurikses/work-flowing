import { use } from 'react'
import { PageContext } from '@/context/PageContent'

export type { Page } from '@/context/PageContent'

export function usePageContext() {
  const context = use(PageContext)
  if (!context) {
    throw new Error('usePageContext must be used within context')
  }
  return context
}
