"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function SwitchThemesButton(){
    const [mounted, setMounted] = useState<boolean>(false);
    const {theme, setTheme} = useTheme();

    const Icon = theme == "dark" ? Moon : Sun;

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) return null;

    return (
        <button 
            onClick={() => setTheme(prev => prev == "dark" ?  "light" : "dark")}
            className={`cursor-pointer p-2 bg bg-transparent hover:bg-(--muted) rounded 
            text-(--muted-foreground) hover:text-(--foreground)`}
        >
            <Icon size={18} />
        </button>
    )
}