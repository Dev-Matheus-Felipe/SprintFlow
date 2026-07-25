"use client"

import { Menu } from "lucide-react"
import { useContext } from "react"
import { SidebarProviderContext } from "../providers/sidebarProvider/sidebarProvider";

export default function MenuButton(){
    const context = useContext(SidebarProviderContext);
    if(!context) return null;

    return (
        <button 
            onClick={() => context.setOpen(prev => !prev)}
            className={`cursor-pointer p-2 bg bg-transparent hover:bg-(--muted) rounded text-(--muted-foreground) 
            hover:text-(--foreground) md:hidden`}
        >
            <Menu size={18} color="var(--muted-foreground)"/>
        </button>
    )
}