import {ReactNode} from "react";
import {usePageContext} from "@/context/PageContext";
import { columns, Task } from "@/components/tasks/columns"
import {DataTable} from "@/components/tasks/data-table";
export default function MainScreen({children: children }: {children: ReactNode}) {

    const {currentPage, setCurrentPage} = usePageContext();
    const data = [
        {
            id: "728ed52f",
            name: "Привести дела в порядок",
            status: false,
            description: "Сделай хоть что-нибудь!",
            dueDate: Intl.DateTimeFormat("ru-RU").format(new Date()),
        },

    ]

    return (
        <div className="w-full bg-(--secondary-bg-color)  rounded-l-xl h-[97%] self-center">

            {children}
             <div>
                 <DataTable columns={columns} data={data}/>

             </div>
        </div>
    )
}