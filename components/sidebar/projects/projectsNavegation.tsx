"use client"

import { Project } from "@prisma/client"
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react"

export default function ProjectsNavegation({projects} : {projects: Project[]}){
    const [show, setShow] = useState(false);

    return (
        <div className="w-full overflow-y-auto p-5">
            <button 
                onClick={() => setShow(prev => !prev)}
                className="flex gap-2 items-center justify-between w-full text-(--muted-foreground) cursor-pointer">
                <h2 className="text-sm">PROJECTS</h2>
                {!show ? <ChevronRight size={16} /> : <ChevronDown size={16}/> }
            </button>
        </div>
    )
}