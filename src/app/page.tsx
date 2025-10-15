'use client'

import MainScreen from '@/components/main-screen'
import { DialogProvider } from '@/context/DialogContext'
import { PageProvider } from '@/context/PageContent'
import { TaskProvider } from '@/context/TaskContent'
import AsidePanel from '../components/aside-panel'

export default function Home() {
  interface Page {
    name: string
  }

  return (
    <div className="bg-(--bg-color) w-screen h-screen overflow-hidden flex dark">
      <PageProvider>
        <TaskProvider>
          <DialogProvider>
            <AsidePanel isAbsolute={false} />
          </DialogProvider>
          <MainScreen>

            <h1>WORK IN PROGRESS</h1>
          </MainScreen>
        </TaskProvider>
      </PageProvider>
    </div>
  )
}
