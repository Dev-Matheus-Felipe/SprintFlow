"use client"

import useProjectData from "@/lib/hooks/projectProps";
import { ProjectOverviewType } from "@/lib/types";
import { useEffect } from "react";


export default function SetDataComponent({
    project,
} :{ 
    project: ProjectOverviewType
}){
    const { setData } = useProjectData();
    
    useEffect(() => {
        const sprints = project.sprints.map(sprint => ({name: sprint.name, id: sprint.id}));

        setData({
            tasks: project.tasks,
            sprints: sprints,
            projectInfo: {
                icon: project.icon,
                name: project.name,
                id: project.id
            }
        })
    }, [])

    return null;
}