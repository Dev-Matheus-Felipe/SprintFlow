"use client"

import { NewProjectContext } from "@/components/providers/newProjectProvider"
import { useContext } from "react"

export default function useNewProject(){
    const ctx = useContext(NewProjectContext);
    if (!ctx) throw new Error("newProject must be used within the newProjectProvider");

    return ctx;
}