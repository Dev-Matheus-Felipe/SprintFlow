"use client"

import { createContext, Dispatch, useState } from "react"
import NewProjectModal from "../modals/newProjectModal";


type NewProjectContextType = {
    open: boolean,
    setOpen: Dispatch<React.SetStateAction<boolean>>
}

export const NewProjectContext = createContext<NewProjectContextType | null>(null);

export default function NewProjectProvider({
    children,
} : {
    children: React.ReactNode,
}){
    const [open, setOpen] = useState<boolean>(false);

    return (
        <NewProjectContext.Provider value={{open, setOpen}}>
            {open && <NewProjectModal setOpen={setOpen} />}
            {children}
        </NewProjectContext.Provider>
    )
}