import Tasks from "@/components/projects/tasks/tasks";
import getTaskPage from "@/lib/task/getTaskPage";
import {ProjectTaskPageType } from "@/lib/types";
import { ProjectUrlParamstype } from "../page";
import { ProjectIcons } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { SetTitlePage } from "@/components/topbar/setTitlePage";
import SetProjectSprints from "@/components/projects/tasks/setProjectSprints";

export type projetInfoType = {
    name: string,
    id: string,
    icon: ProjectIcons
}

const tableHeaders = ["Tasks", "Status", "Priority", "Responsible", "Deadline", "Points"];


export default async function ProjectTasksPage({params} : ProjectUrlParamstype){
    const { url } =  await params;
    const session = await auth();
    
    if (!session?.user?.id) {
        return notFound();
    }

    const valitedUrl = url
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    
    const project: ProjectTaskPageType | null = await getTaskPage({url: valitedUrl, userId: session.user.id});

    if(!project) notFound();
    
    return (
        <>
            <SetProjectSprints sprints={project.sprints} projectId={project.id} />
            <SetTitlePage title={"Tasks"} />

            <Tasks 
                projectInfo={{name: project.name, icon: project.icon, id: project.id}} 
                tableHeaders={tableHeaders}
                tasks={project.tasks} 
            />
        </>
    )
}