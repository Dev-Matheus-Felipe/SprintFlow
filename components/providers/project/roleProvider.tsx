"use client"

import { ProjectRoles } from "@prisma/client";
import { createContext } from "react";

export const RoleContext = createContext<{role: ProjectRoles} | null>(null);

export default function RoleProvider({children, role} : {children: React.ReactNode, role: ProjectRoles}){
    return (
        <RoleContext.Provider value={{role}}>
            {children}
        </RoleContext.Provider>
    )
}