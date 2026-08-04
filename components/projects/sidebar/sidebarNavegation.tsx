"use client"

import { usePageTitle } from "@/lib/hooks/pageTitle";
import { SidebarProjectsType } from "@/lib/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"

const projectStatusColors = new Map([
    ["Active", "#16A34A"],
    ["Paused", "#eb6e25"],
    ["Completed", "#15803D"],
    ["Cancelled", "#DC2626"],
]);

export default function ProjectsNavegation({projects} : {projects: SidebarProjectsType[]}){
    const [show, setShow] = useState(false);
    
    const { title } = usePageTitle();
    const pathname = usePathname();

    return (
        <div className="flex-1 min-h-0 p-5 flex flex-col">
            <button 
                onClick={() => setShow(prev => !prev)}
                className="flex gap-2 items-center justify-between w-full text-(--muted-foreground) cursor-pointer">
                <h2 className="text-[13px]">PROJECTS</h2>
                {!show ? <ChevronRight size={16} /> : <ChevronDown size={16}/> }
            </button>

            {/* PROJECTS */}
            <div className="w-full pr-2 my-4 overflow-y-auto flex-1 ">
                {show && ( projects.length > 0  
                    ? projects.map(({name, id, color, status, url}) => {
                        const statusColor = projectStatusColors.get(status)!;

                        return (
                            <Link 
                                href={`/projects/${url}`} 
                                key={id} 
                                className={`group flex items-center justify-between py-2 px-3 rounded 
                                ${pathname == `/projects/${url}` 
                                    ? "bg-(--accent) text-(--primary)" 
                                    : "text-(--muted-foreground) hover:bg-(--muted) hover:text-(--foreground)!"}`}
                            >

                                <div className="flex items-center gap-5">
                                    <div className="w-2 h-2 rounded-full" style={{background: color.toLowerCase()}} />
                                    <p className="text-sm">{name}</p>
                                </div>

                                <div 
                                    className={`w-2 h-2 rounded-full opacity-0 group-hover:opacity-100
                                    ${(title == name && pathname.startsWith("/projects/")) && "opacity-100"}`}
                                    style={{background: statusColor}} 
                                />
                            </Link>
                        )
                    })

                    : <p className="text-(--muted-foreground) text-sm pt-1">No projects created yet.</p>
                )}
            </div>
        </div>
    )
}