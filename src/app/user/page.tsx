import type { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export default async function UsersPage() {
  const users: User[] = await prisma.user.findMany()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        <div>
          <h1>
            email:
            {users[0].name}
          </h1>
        </div>
      </ul>
    </div>
  )
}
