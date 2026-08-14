"use client"

import { TaskContext } from "@/components/providers/tasksProvider";
import { useContext } from "react"

export default function useTask(){
    const ctx = useContext(TaskContext);
    if(ctx == null) throw new Error("Project Context must be inside the Project Provider");

    return ctx;
}