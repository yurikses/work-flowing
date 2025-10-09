'use client'
import { SignInForm } from "@/components/forms";
import { Toaster } from "@/components/ui/sonner"


export default function SignUpPage() {
    return (
        <div className="bg-(--secondary-bg-color) w-screen h-screen overflow-hidden flex">
            <div className=" min-w-[30%] min-h-[30%] m-auto flex flex-col p-4 rounded-md bg-(--bg-color) shadow-xl">
                <h2 className="text-2xl font-bold text-center">Вход</h2>
                <SignInForm/>
                <div className="  text-xs text-zinc-300 mt-2">
                    <p className="text-center">Нет аккаунта для входа? | <a className="hover:text-white transition-all duration-150" href="/sign-up">Регистрация</a></p>
                </div>
            </div>

        </div>
    )
}
