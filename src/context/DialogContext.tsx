import type { ReactNode } from 'react'
import React, { createContext, use, useState } from 'react'

interface DialogContextType {
  isOpen: boolean
  toggleDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDialog = () => {
    setIsOpen(!isOpen)
  }
  return (
    <DialogContext value={{ isOpen, toggleDialog }}>
      {children}
    </DialogContext>
  )
}

export function useDialog() {
  const context = use(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
