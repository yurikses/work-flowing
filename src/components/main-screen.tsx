import type { Record } from 'effect/Schema'
import type { ReactNode } from 'react'
import { VscLoading } from 'react-icons/vsc'
import TaskScreen from '@/components/tasks/task-screen'
import { usePageContext } from '@/hooks/usePageContext'
import { useSession } from '@/lib/auth-client'

export default function MainScreen({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession()
  const { currentPage } = usePageContext()

  const PageNodes: Record<string, ReactNode> = {
    tasks: (
      <TaskScreen session={session} />
    ),
  }
  return (
    <div className="w-full bg-(--secondary-bg-color)  rounded-l-xl h-[97%] self-center p-2">
      <div>
        {children}
        { isPending
          ? (
              <div className="fixed w-screen h-screen">
                <div>
                  <h3>Подождите, идёт загрузка рабочего пространства</h3>
                  <VscLoading className="animate-spin" />
                </div>
              </div>
            )
          : PageNodes[currentPage]}
      </div>
    </div>
  )
}
