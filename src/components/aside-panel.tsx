'use client'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

import { VscLoading } from 'react-icons/vsc'
import DropDown from '@/components/drop-down'
import DropDownUser from '@/components/drop-down-menu'
import { TaskDialog } from '@/components/tasks/task-create-dialog'
import { Button } from '@/components/ui/button'
import { useDialog } from '@/context/DialogContext'
import { usePageContext } from '@/hooks/usePageContext'
import { useSession } from '@/lib/auth-client'

interface Action {
  name: string
  onClick: () => void
}

interface AsidePanelProps {
  isAbsolute?: boolean
}

export default function AsidePanel({ isAbsolute }: AsidePanelProps) {
  const { currentPage } = usePageContext()
  const { isOpen, toggleDialog } = useDialog()
  const router = useRouter()
  const { data, isPending } = useSession()

  const actions: Record<string, Action[]> = {
    tasks: [
      { name: 'Создать задачу', onClick: toggleDialog },
    ],
    financials: [
      { name: 'Финансовый отчет', onClick: () => router.push('/financials/report') },
      { name: 'Добавить транзакцию', onClick: () => router.push('/financials/add-transaction') },
    ],
    projects: [
      { name: 'Мои проекты', onClick: () => router.push('/projects') },
      { name: 'Создать проект', onClick: () => router.push('/projects/create') },
    ],
    notes: [
      { name: 'Мои заметки', onClick: () => router.push('/notes') },
      { name: 'Создать заметку', onClick: () => router.push('/notes/create') },
    ],
  }
  return (

    <div className={`h-full  sm:min-w-1/3 md:min-w-3/10 : lg:min-w-3/15 xl:min-w-2/14  rounded-xl p-4 flex flex-col ${isAbsolute ? 'absolute' : ''}`}>
      {data != null
        ? (
            <>
              <DropDown containerClass="self-center" />

              <div className="mt-16 flex flex-col justify-center gap-4">
                {actions[currentPage]?.map((action: Action, index: number) => {
                  return (
                    <button type="button" className="hover:translate-x-1 transition-transform duration-125" key={index} onClick={action.onClick}>
                      {action.name}
                    </button>
                  )
                })}
              </div>
            </>
          )
        : (
            <div>

            </div>
          )}

      <div className="mt-auto mb-20">
        <Suspense fallback={<VscLoading className="animate-spin" />}>
          {isPending
            ? (
                <VscLoading className="animate-spin" />
              )
            : data
              ? (
                  <DropDownUser
                    nickname={data.user.name}
                    avatarUrl={data.user.image}
                  />
                )
              : (
                  <div className="flex gap-2 justify-between">
                    <Button variant="default" onClick={() => router.push('/sign-in')}>
                      Войти
                    </Button>
                    <Button
                      variant="secondary"
                      size="default"
                      onClick={() => router.push('/sign-up')}
                    >
                      Регистрация
                    </Button>
                  </div>
                )}
        </Suspense>

      </div>

      <TaskDialog isOpen={isOpen} toggleDialog={toggleDialog} />

    </div>
  )
}
