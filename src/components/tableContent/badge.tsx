import { Badge } from '@/components/ui/badge'

export function StatusBadge({ variant, text, isActive }: { variant?: 'destructive' | 'default' | 'outline' | 'secondary' | 'success', text?: string, isActive?: boolean }) {
  const variations = {
    active: '',
  }
  let taskStatus = ''
  if (isActive !== undefined) {
    taskStatus = !isActive ? 'active' : 'done'
  }
  return (
    <>
      {taskStatus == 'active' ? <Badge variant="destructive">Не выполнено</Badge> : null}
      {taskStatus == 'done' ? <Badge variant="success">Выполнено</Badge> : null}
    </>
  )
}
