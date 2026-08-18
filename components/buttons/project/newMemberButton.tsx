"use client"

import useProjectApp from "@/lib/hooks/projectApp";
import { Plus, UserPlus } from "lucide-react"

export default function NewMemberButton({style, banner} : {style: string, banner?: boolean}){
    const { modal, role } = useProjectApp();
    
    return (
        <>
            { role == "Member" ? null : 
                <button 
                    onClick={() => modal.setComponent("addUser")}    
                    className={style}
                >
                    { banner ? <UserPlus size={12} /> : <Plus size={12} /> }
                    Invite User
                </button>
            }
        </>
    )
}