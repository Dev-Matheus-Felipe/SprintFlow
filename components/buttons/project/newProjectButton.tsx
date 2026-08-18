"use client"

import useAppModal from "@/lib/hooks/appModal";
import { Plus } from "lucide-react"

export default function NewProjectButton(){
    const { modal } = useAppModal();

    return (
        <button 
            onClick={() => modal.setComponent("newProject")}
            className={`flex items-center gap-1.5 bg-(--primary) text-(--primary-foreground) rounded cursor-pointer 
            hover:bg-(--accent-foreground) py-2 px-3`}
        >
            <Plus size={16} />
            <p className="text-sm">New Project</p>
        </button>
    )
}