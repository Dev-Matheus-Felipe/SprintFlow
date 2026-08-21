"use client"

import deleteProjectAction from "@/lib/project/components/deleteProject";
import { Trash2 } from "lucide-react"


export default function DeleteProject({
    projectId,

} :{
    projectId: string,
}){
    const handleClick = async() => {
        const sure = window.confirm("Tem certeza que deseja excluir?");

        if(sure){
            const res = await deleteProjectAction({projectId});

            alert(res.message);

            if(res.sucess){
                window.location.href = "/projects";
            }
        }

    }
    
    return (
        <button
            onClick={handleClick}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors 
            text-(--muted-foreground) cursor-pointer hover:bg-(--primary) hover:text-(--foreground)`}
        >

            <Trash2 size={15} />
        </button>
    )
}