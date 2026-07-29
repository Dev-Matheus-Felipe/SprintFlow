"use client"

import useSidebar from "@/lib/hooks/sidebar";
import { Menu } from "lucide-react"

export default function OpenSidebarButton(){
    const { setOpen } = useSidebar();

    return (
        <button 
            onClick={() => setOpen(prev => !prev)}
            className={`cursor-pointer p-2 bg bg-transparent hover:bg-(--muted) rounded text-(--muted-foreground) 
            hover:text-(--foreground) md:hidden`}
        >
            <Menu size={18} color="var(--muted-foreground)"/>
        </button>
    )
}