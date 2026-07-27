"use client"

import { createContext, Dispatch, useState } from "react"

type SidebarContextType = {
    open: boolean,
    setOpen: Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export default function SidebarProvider({
    children,
} : {
    children: React.ReactNode
}){
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <SidebarContext.Provider value={{open, setOpen}}>
            {children}
        </SidebarContext.Provider>
    )
}