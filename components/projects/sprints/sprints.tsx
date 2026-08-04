"use client"

import { ProjectInfoType } from "@/components/providers/projectProvider";
import { usePageTitle } from "@/lib/hooks/pageTitle"
import { Sprint } from "@prisma/client";
import { useEffect } from "react";
import TaskSprintHeader from "../taskSprintHeader";

export default function ProjectSprintComponent({
    sprints,
    projectInfo
} : { 
    sprints: Sprint[],
    projectInfo: ProjectInfoType
}){

    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle("Sprints");
    },[])

    return (
        <div className="flex-1 flex flex-col">
            <TaskSprintHeader type="Sprint" length={sprints.length} projectInfo={projectInfo} />
        </div>
    )
}