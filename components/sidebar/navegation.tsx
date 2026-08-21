"use client"

import { mainNav } from "@/lib/data/generalData";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useContext, useEffect } from "react";
import { SidebarContext } from "../providers/sidebarProvider";

export default function MainNavegation(){
    const context = useContext(SidebarContext);
    const pathname = usePathname();

    if(!context) return null;
    
    const {open, setOpen} = context;

    useEffect(() => {
        if(open) setOpen(false);
    }, [pathname]);

    return (
        <div className="w-full flex flex-col gap-2 p-3 py-5 pb-2">
            {mainNav.map(({Icon, label, url}) => (
                <Link 
                    key={label} 
                    href={url}
                    className={`flex items-center gap-3 p-3 rounded ${url == pathname 
                        ? "bg-(--accent) text-(--primary)" 
                        : "text-(--muted-foreground) hover:bg-(--muted) hover:text-(--foreground)!"}`} 
                >
                    <Icon size={16} color={pathname == url ? "var(--primary)" : "var(--muted-foreground)"} />
                    
                    <h2  className={`text-sm`}>
                        {label}
                    </h2>
                </Link>
            ))}
        </div>
    )
}