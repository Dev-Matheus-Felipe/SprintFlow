"use client"

import React, { createContext, Dispatch, useState } from "react"

type sidebarProviderType = {
    open: boolean,
    setOpen: Dispatch<React.SetStateAction<boolean>>  
};

export const SidebarProviderContext = createContext<sidebarProviderType | null>(null);

export default function SidebarProvider({children} : {children: React.ReactNode}){
    const [open, setOpen] = useState<boolean>(false);

    return (
        <SidebarProviderContext.Provider value={{open, setOpen}}>
            {children}
        </SidebarProviderContext.Provider>
    )
}