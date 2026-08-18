"use client"

import React, { createContext, Dispatch, useState } from "react"
import NewTaskModal from "../modals/newTaskModal"
import NewProjectModal from "../modals/newProjectModal"

export type AppModalsDataType = {
    component: ModalsType,
    setComponent: Dispatch<React.SetStateAction<ModalsType>>
}

export type ModalsType = "newProject" | null

export const AppModalsContext = createContext<AppModalsDataType | null>(null);

function ManageModals({component, close} : {component: ModalsType, close: () => void}){
    switch(component){
        case "newProject":
            return <NewProjectModal close={close} />

        default:
            return null
    }
}

export default function AppModalsProvider({children} : {children: React.ReactNode}){
    const [component, setComponent] = useState<ModalsType | null>(null);

    const close = () => setComponent(null);

    return (
        <AppModalsContext.Provider value={{component, setComponent}}>
            {children}

            <ManageModals component={component} close={close} />
        </AppModalsContext.Provider>
    )
}