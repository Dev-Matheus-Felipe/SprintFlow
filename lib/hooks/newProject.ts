"use client"

import { ModalsContext } from "@/components/providers/modalsProvider";
import { useContext } from "react"

export default function useNewProject(){
    const ctx = useContext(ModalsContext);
    if (!ctx) throw new Error("newProject must be used within the newProjectProvider");

    return ctx;
}