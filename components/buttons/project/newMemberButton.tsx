"use client"

import { Plus } from "lucide-react"

export default function NewMemberButton(){
    return (
        <button className="flex items-center gap-1 text-xs transition-colors text-(--primary) cursor-pointer">
            <Plus size={12} />
            Convidar
        </button>
    )
}