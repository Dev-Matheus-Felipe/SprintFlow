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
            <aside className={`w-60 h-screen flex flex-col bg-(--sidebar) relative max-md:absolute z-10
            duration-500 ${open ? "max-md:left-0" : "max-md:-left-full"}`}>
                {children}
            </aside>

            <div 
                className={`${open ? "fixed" : "hidden"} inset-0 min-w-screen h-screen z-5 bg-black/60`} 
                onClick={() => setOpen(false)}
            />
        </>
    )
}