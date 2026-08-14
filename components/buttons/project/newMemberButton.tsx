"use client"

import useModal from "@/lib/hooks/newProject"
import { Plus, UserPlus } from "lucide-react"

export default function NewMemberButton({style, banner} : {style: string, banner?: boolean}){
    const { setStatus } = useModal();

    return (
        <button 
            onClick={() => setStatus({component: "newUser", open: true})}    
            className={style}
        >
            { banner ? <UserPlus size={12} /> : <Plus size={12} /> }
            Invite User
        </button>
    )
}