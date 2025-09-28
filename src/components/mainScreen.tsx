import {ReactNode} from "react";
import {usePageContext} from "@/context/PageContext";

export default function MainScreen({children: children }: {children: ReactNode}) {

    const {currentPage, setCurrentPage} = usePageContext();

    return (
        <div className="w-full bg-(--secondary-bg-color)  rounded-l-xl h-[97%] self-center">

            {children}
            <p className="text-red text-2xl">
                {currentPage}
            </p>

        </div>
    )
}