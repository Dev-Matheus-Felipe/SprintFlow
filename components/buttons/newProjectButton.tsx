"use client"

import { Plus } from "lucide-react"
import { useContext } from "react"
import { NewProjectContext } from "../providers/newProjectProvider"

export default function NewProjectButton(){
    const context = useContext(NewProjectContext);
    if(!context) return null;

    const {setOpen} = context;

    return (
        <button 
            onClick={() => setOpen(true)}
            className={`flex items-center gap-1.5 bg-(--primary) text-(--primary-foreground) rounded cursor-pointer 
            hover:bg-(--accent-foreground) py-2 px-3`}
        >
            <Plus size={16} />
            <p className="text-sm">New Project</p>
        </button>
    )
}