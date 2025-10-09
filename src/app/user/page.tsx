import { prisma } from '@/lib/prisma'
import { User } from "@prisma/client"


export default async function UsersPage() {
    const users:User[] = await prisma.user.findMany()

    return (
        <div>
            <h1>Users</h1>
            <ul>
                <div>
                    <h1>email: {users[0].username}</h1>
                </div>
            </ul>
        </div>
    )
}