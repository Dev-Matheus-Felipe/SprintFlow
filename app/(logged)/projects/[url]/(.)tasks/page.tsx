"use client"

import Tasks from "@/components/projects/tasks/tasks";
import useProjectData from "@/lib/hooks/projectProps"

export default function ProjectTasksIntercept(){
    const { data } = useProjectData();

    if(!data){
        throw new Error("Project Context must be inside the Project Provider");
    }
    
    return (
      <Tasks tasks={data.tasks} sprints={data.sprints} projectInfo={data.projectInfo} />
  );
}