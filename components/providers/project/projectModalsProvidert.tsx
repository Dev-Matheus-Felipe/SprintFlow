"use client"

import NewSprintModal from "@/components/modals/newSprintModal"
import NewTaskModal from "@/components/modals/newTaskModal"
import ViewProjectTaskModal from "@/components/modals/viewProjectTaskModal"
import React, { createContext, Dispatch, useState } from "react"

export type ProjectModalsDataType = {
    component: ProjectModalsType,
    setComponent: Dispatch<React.SetStateAction<ProjectModalsType>>
}

export type ProjectModalsType = "addTask" | "addUser" | "addSprint" | "viewTask" | "viewSprint"  | null

export const ProjectModalsContext = createContext<ProjectModalsDataType | null>(null);

function ManageModals({component, close} : {component: ProjectModalsType, close: () => void}){
    switch(component){
        case "addTask":
            return <NewTaskModal close={close} />

        case "addSprint":
            return <NewSprintModal close={close}  />

        case "viewTask":
            return <ViewProjectTaskModal close={close}  />

        default:
            return null
    }
}

export default function ProjectModalsProvider({children} : {children: React.ReactNode}){
    const [component, setComponent] = useState<ProjectModalsType | null>(null);

    const close = () => setComponent(null);

    return (
        <ProjectModalsContext.Provider value={{component, setComponent}}>
            {children}

            <ManageModals component={component} close={close} />
        </ProjectModalsContext.Provider>
    )
}