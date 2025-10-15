import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/auth-client'

export default function DropDownUser({ nickname, avatarUrl }: { nickname: string, avatarUrl?: string | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-3 items-center justify-around">
          <Avatar>
            <AvatarFallback className="">{nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
          </Avatar>

          <p>{nickname}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => alert('profile')}>Профиль</DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert('Settings')}>Настройки</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
