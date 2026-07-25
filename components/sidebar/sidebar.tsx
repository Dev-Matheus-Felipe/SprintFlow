"use client"

import { useContext } from "react";
import { SidebarProviderContext } from "../providers/sidebarProvider/sidebarProvider";

export default function Sidebar({children} : {children: React.ReactNode}){
    const context = useContext(SidebarProviderContext);
    if(!context) return null;
    
    return (
        <aside className={`w-60 h-screen flex flex-col bg-(--sidebar) relative max-md:absolute
        duration-500 ${context.open ? "max-md:left-0" : "max-md:left-[-110%]"}`}>
            {children}
        </aside>
    )
}