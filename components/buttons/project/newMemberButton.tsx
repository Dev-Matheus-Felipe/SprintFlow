"use client"

import useModal from "@/lib/hooks/newProject"
import { Plus } from "lucide-react"

export default function NewMemberButton(){
    const { setStatus } = useModal();

    return (
        <button 
            className="flex items-center gap-1 text-xs transition-colors text-(--primary) cursor-pointer"
            onClick={() => setStatus({component: "newUser", open: true})}    
        >
            <Plus size={12} />
            Invite User
        </button>
    )
}