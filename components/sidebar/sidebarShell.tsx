"use client"

import React, { Dispatch, useContext } from "react"
import { SidebarContext } from "../providers/sidebarProvider"

export default function SidebarShell({
    children,
} : {
    children: React.ReactNode,
}){
    const context = useContext(SidebarContext);
    if(!context) return null;

    const {open, setOpen} = context;

    return (
        <>
            <aside className={`max-md:w-55 w-60 h-screen flex flex-col bg-(--sidebar) relative max-md:fixed inset-0 z-19
            duration-500 ${open ? "max-md:left-0" : "max-md:-left-full"}`}>
                {children}
            </aside>

            <div 
                className={`${open ? "opacity-100 z-5" : "opacity-0"} fixed inset-0 min-w-screen h-screen -z-5 bg-black/60 duration-200`} 
                onClick={() => setOpen(false)}
            />
        </>
    )
}