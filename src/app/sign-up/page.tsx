import {SignUpForm} from "@/components/forms";

export default function SignUpPage(){
    return (
        <div className="bg-(--secondary-bg-color) w-screen h-screen overflow-hidden flex">
            <div className=" min-w-[30%] min-h-[60%] m-auto flex flex-col p-4 rounded-md bg-(--bg-color) shadow-xl">
                <h2 className="text-2xl font-bold text-center" >Pегистрация</h2>
                <SignUpForm/>
                <div className="  text-xs text-zinc-300 mt-2">
                    <p className="text-center">Уже есть аккаунт для входа? | <a className="hover:text-white transition-all duration-150" href="/sign-in">Войти</a></p>
                </div>
            </div>

        </div>
    )
}
