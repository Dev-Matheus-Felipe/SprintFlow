"use client"

import { ProjectCotext } from "@/components/providers/projectProvider";
import { useContext } from "react"

export default function useProject(){
    const ctx = useContext(ProjectCotext);
    if(ctx == null) throw new Error("Project Context must be inside the Project Provider");

    return ctx;
}