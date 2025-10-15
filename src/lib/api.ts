import { toast } from 'sonner'

export async function updateTaskStatus({ taskId, status }: { taskId: number, status: boolean }) {
  try {
    // const {data : session} =  useSession();

    const response = await fetch('/api/task', {
      method: 'PATCH',
      body: JSON.stringify({ taskId, isActive: status }),
      headers: {
        'Content-Type': 'application/json',

      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
      throw new Error(errorData.error || 'Ошибка обновления статуса задачи')
    }
    return await response.json()
  }
  catch (error) {
    console.error(error)
  }
}

export async function getTasks() {
  try {
    const response = await fetch('/api/task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
      throw new Error(errorData.error || 'Ошибка загрузки задач')
    }
    return await response.json()
  }
  catch (error) {
    toast('Ошибка при загрузке задач.', {
      action: {
        label: 'Понял',
        onClick: () => console.log('Error toast closed.'),
      },
    })
    console.error(error)
  }
}
