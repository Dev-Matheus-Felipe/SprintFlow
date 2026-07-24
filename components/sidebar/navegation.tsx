"use client"

import { Activity, CheckSquare, FolderKanban, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"

const mainNav = [
    {Icon: LayoutDashboard, label: "Dashboard", url: "/dashboard"},
    {Icon: FolderKanban, label: "Projects", url: "/projects"},
    {Icon: CheckSquare, label: "My Tasks", url: "/myTasks"},
    {Icon: Activity, label: "Sprints", url: "/sprints"},
];

export default function MainNavegation(){
    const pathname = usePathname();

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