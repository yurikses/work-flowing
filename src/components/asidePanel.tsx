'use client';
import DropDown from "@/components/dropDown";
import {PageProvider, usePageContext} from "@/context/PageContext";

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

    const actions = [
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New Task", href: "/tasks",},
        ],
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New Category", href: "/tasks",},
        ],
        [
            {id: 1, name: "Home", href: "/home",},
            {id: 2, name: "Add New setting", href: "/tasks",},
        ]
    ]


    return (

        <div className={"top-3 left-2 h-full w-[15vw]  rounded-xl p-4 flex flex-col items-start " +( isAbsolute ? "absolute":"")}>

                <DropDown  containerClass="self-center"/>

            <div className="mt-16 flex flex-col gap-4">
                {actions[currentPage].map((action, id) => {
                    return (<a className="hover:translate-x-1 transition-transform duration-125" key={id} href={action.href}>
                        {action.name}
                    </a>)
                })}
            </div>

            <div className="mt-auto mb-20">
                <img src="" alt=""/>
                <span>Матвей Ратаеп</span>
            </div>

        </div>
    )
}