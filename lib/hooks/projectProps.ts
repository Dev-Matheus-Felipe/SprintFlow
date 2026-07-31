"use client"

import { ProjectContext } from "@/components/providers/projectProvider"
import { useContext } from "react"

export default function useProjectData(){
    const ctx = useContext(ProjectContext);
    if(ctx == null) throw new Error("Project Context must be inside the Project Provider");

    return {
        data: ctx.data,
        setData: ctx.setData,
    };
}