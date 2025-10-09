'use client';
import DropDown from "@/components/dropDown";
import {PageProvider, usePageContext} from "@/context/PageContext";

import DropDownUser from "@/components/dropDownMenu";
import {useSession} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {TaskDialog} from "@/components/tasks/task-create-dialog";
import {useState} from "react";
import {DialogProvider, useDialog} from "@/context/DialogContext";


interface Page {
    id: number,
    href: string,
    name: string
}


interface AsidePanelProps {
    pages?: Page[],
    isAbsolute?: boolean,
}

export default function AsidePanel({isAbsolute}:AsidePanelProps) {
    const { currentPage, pages } = usePageContext();
    const {isOpen, toggleDialog} = useDialog()
    const router = useRouter();
    const session =  useSession();

    const actions = [
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New Task", href: "/add-new-task", onClick : toggleDialog  },
        ],
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New Category", href: "",},
        ],
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New setting", href: "",},

        ],
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New Habit", href: "",},
        ]
    ]

    console.log(session.data)
    return (

        <div className={"top-3 left-2 h-full w-[15vw]  rounded-xl p-4 flex flex-col items-start  " +( isAbsolute ? "absolute":"")}>

                <DropDown  containerClass="self-center"/>

            <div className="mt-16 flex flex-col gap-4">
                {actions[currentPage].map((action, id) => {
                    return (<button className="hover:translate-x-1 transition-transform duration-125" key={id} onClick={action.onClick}>
                        {action.name}
                    </button>)
                })}
            </div>
            <div className="mt-auto mb-20">
                {session.data ?
                    (<>
                        <DropDownUser nickname={session.data.user.name} avatarUrl={session.data.user.image} />
                    </>
                    ) :
                    (<div className="flex gap-2">
                        <Button variant={"default"} onClick={()=> router.push("/sign-in")}>
                            Войти
                        </Button>
                        <Button variant={"secondary"} size="default" onClick={()=> router.push("/sign-up")}>
                            Регистрация
                        </Button>
                    </div>)
                }


            </div>
            <TaskDialog isOpen={isOpen} toggleDialog={toggleDialog}/>


        </div>
    )
}