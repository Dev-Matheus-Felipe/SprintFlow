"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function LogoutButton(){
    return (
        <div className="p-2 pl-4">
            <button 
                className={`flex items-center gap-2 w-full p-3 text-(--muted-foreground) cursor-pointer 
                cursor-hover hover:bg-[rgba(239,68,68,0.08)] hover:text-red-500`}  
                onClick={() => signOut()}
            >
                <LogOut size={16} />
                <p className="text-sm">Log Out</p>
            </button>
        </div>
    )
}