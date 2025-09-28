'use client';

import AsidePanel from "../components/asidePanel"
import MainScreen from "@/components/mainScreen";
import {PageProvider} from "@/context/PageContext";

export default function Home() {

    interface Page {
        id: number,
        href:string,
        name:string
    }
    const pages : Page[] = [
        {id:1, name: "Main", href: "/home"},
        {id:2, name: "Tasks", href: "/settings"},
        {id:3, name: "Financials", href: "/stats"},
    ]

    return (
    <div className="bg-(--bg-color) w-screen h-screen overflow-hidden flex">
        <PageProvider pages={pages}>
            <AsidePanel isAbsolute={false}/>
            <MainScreen>

            </MainScreen>
        </PageProvider>
    </div>
  );
}
