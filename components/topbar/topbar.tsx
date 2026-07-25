"use client"

import { usePathname } from "next/navigation";
import GlobalSearch from "./globalSearch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import MenuButton from "../buttons/menuButton";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/myTasks": "My Tasks",
  "/sprints": "Sprints",
  "/profile": "Profile",
};

export default function Topbar(){
    const pathname = usePathname();

    const [mounted, setMounted] = useState<boolean>(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    
    const name = pageTitles[pathname];
    const Icon = theme == "dark" ? Sun : Moon;

    return (
        <div className="w-full border-b border-(--border) h-16 flex items-center justify-between px-5">
            <h1 className="text-md font-bold">{name}</h1>

            <div className="flex items-center gap-3">
                <GlobalSearch />
                
                <button 
                    onClick={() => setTheme(prev => prev == "dark" ?  "light" : "dark")}
                    className={`cursor-pointer p-2 bg bg-transparent hover:bg-(--muted) rounded 
                    text-(--muted-foreground) hover:text-(--foreground)`}
                >
                    <Icon size={18} />
                </button>

                <MenuButton />
            </div>
        </div>
    )
}