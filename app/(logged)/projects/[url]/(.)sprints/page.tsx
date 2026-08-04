"use client"

import ProjectSprintComponent from "@/components/projects/sprints/sprints";
import useProjectData from "@/lib/hooks/projectProps"

export default function ProjectSprintsPage(){
    const { data } = useProjectData();

    if(!data) {
        throw new Error("Project Context must be inside the Project Provider");
    }
    
    return (
        <ProjectSprintComponent projectInfo={data.projectInfo} sprints={data.sprints} />
    )
}