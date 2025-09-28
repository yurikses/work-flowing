import {createContext, ReactNode, useContext, useState} from "react";

interface Page {
    id: number,
    href: string,
    name: string,
}

interface PageContextType {
    currentPage: number;
    setCurrentPage: (index: number) => void;
    pages: Page[];
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({children,pages}: {children: ReactNode; pages: Page[]}) {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <PageContext.Provider value={{currentPage, setCurrentPage, pages}}>
            {children}
        </PageContext.Provider>
    )
}

export function usePageContext(){
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("usePageContext must be used within context");

    }
    return context;
}