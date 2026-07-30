"use client"

import React, { createContext, Dispatch, useState } from "react"
import NewProjectModal from "../modals/newProjectModal";

type ModalsContextType = {
    status: StatusType,
    setStatus: Dispatch<React.SetStateAction<StatusType>>
}

type StatusType = {
    open: boolean,
    component: "newProject" | "newMember" | null
}

export const ModalsContext = createContext<ModalsContextType | null>(null);

export default function ModalsProvider({
    children,
} : {
    children: React.ReactNode,
}){
    const [status, setStatus] = useState<StatusType>({
        open: false,
        component: null,
    });

    return (
        <ModalsContext.Provider value={{status, setStatus}}>
            { status.open && <ManageModals status={status} setStatus={setStatus} /> }
            {children}
        </ModalsContext.Provider>
    )
}


function ManageModals({
    status, 
    setStatus,
} : {
    status: StatusType, 
    setStatus: Dispatch<React.SetStateAction<StatusType>>,
}){
    
    const openModal = (open: boolean) => {
        setStatus({component: null, open: open});
    }

    switch(status.component){
        case "newMember":
            return null;
        
        case "newProject":
            return <NewProjectModal setOpen={openModal} />;

        default: return null;
    }    

}