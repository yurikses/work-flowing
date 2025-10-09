
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {signOut, useSession} from "@/lib/auth-client";

export default function DropDownUser({nickname, avatarUrl} : {nickname:string, avatarUrl?:string | null}) {



    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={"flex gap-3 items-center"}>
                    <img className="w-[29px] h-auto rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYFTRSu-P2KfQC6YvvOpygFB2gwCqvdFBhA&s" alt=""/>
                    <p>{nickname}</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>alert("profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>alert("Settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>signOut()}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}