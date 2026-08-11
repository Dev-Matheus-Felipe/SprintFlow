"use client"

import React, { createContext, Dispatch, useState } from "react"
import NewProjectModal from "../modals/newProjectModal";
import NewTaskModal from "../modals/newTaskModal";
import NewSprintModal from "../modals/newSprintModal";
import ViewProjectTaskModal from "../modals/viewProjectTaskModal";
import NewUserModal from "../modals/newUser";

type ModalsContextType = {
    status: StatusType,
    setStatus: Dispatch<React.SetStateAction<StatusType>>
}

type StatusType = {
    open: boolean,
    component: "newProject" | "newTask" | "newSprint" | "taskOverview" | "newUser" | null
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
            { status.open && 
                <ManageModals status={status} setStatus={setStatus} /> 
            }

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
        case "newTask":
            return <NewTaskModal setOpen={openModal} />;
        
        case "newProject":
            return <NewProjectModal setOpen={openModal} />;

        case "newSprint":
            return <NewSprintModal setOpen={openModal} />;

        case "taskOverview":
            return <ViewProjectTaskModal setOpen={openModal} />

        case "newUser":
            return <NewUserModal setOpen={openModal} />

        default: return null;
    }    

}