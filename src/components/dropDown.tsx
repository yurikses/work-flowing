import { useEffect, useRef, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { IconContext } from "react-icons";
import {usePageContext} from "@/context/PageContext";

interface Page {
    id: number;
    href: string;
    name: string;
}

interface DropdownProps {
    pages?: Page[];
    containerClass?: string;
    elemClass?: string;
}

export default function DropDown({ containerClass = "", elemClass = "" }: DropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { pages, currentPage, setCurrentPage } = usePageContext();

    const toggleDownDrop = () => {
        setIsOpen(!isOpen);
    };

    // Обработчик клика вне меню
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false); // Закрываем меню, если клик вне его
            }
        };

        // Добавляем слушатель событий при открытом меню
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Удаляем слушатель при закрытии меню или размонтировании компонента
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]); // Зависимость от isOpen, чтобы обновлять слушатель при изменении состояния

    return (
        <div className={"absolute py-1 " + containerClass} ref={dropdownRef}>
            <div
                className={`
          py-2 px-8 transition-transform duration-250 ease-out backdrop-blur-md border-1 border-transparent
          ${isOpen ? "rounded-xl shadow-lg max-h-auto border-zinc-700" : "max-h-9 overflow-hidden"}
        `}
            >
                <button
                    className="flex w-28 gap-2 items-center text-md font-extralight hover:text-white transition-all justify-between"
                    onClick={toggleDownDrop}
                >
                    {pages ? pages[currentPage].name : "ERROR"}
                    <IconContext.Provider value={{ className: "h-[0.8rem] w-auto" }}>
                        <div className={`transition-all duration-250 ${isOpen ? "-rotate-90 scale-110" : "rotate-0"}`}>
                            <SlArrowLeft />
                        </div>
                    </IconContext.Provider>
                </button>

                {/* Анимированное выпадающее меню */}
                <div
                    className={`
                        grid transition-all duration-500 ease-in-out
                        ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                      `}
                >
                    <div>
                        <div className="py-2 space-y-3">
                            {pages?.map((item, index) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className={`
                                        block text-md transition-all duration-150
                                        hover:text-(--accent-color) hover:translate-x-2
                                        transform
                                        ${currentPage === index ? "text-(--accent-color) font-bold" : ""}
                                        ${elemClass}
                                        ${isOpen ? "opacity-100 translate-x-0 delay-0" : "opacity-0 -translate-x-4 delay-0"}
                                      `}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}