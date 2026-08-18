import Tasks from "@/components/projects/tasks/tasks";
import getTaskPage from "@/lib/task/getTaskPage";
import {ProjectTaskPageType } from "@/lib/types";
import { ProjectUrlParamstype } from "../page";
import { ProjectIcons } from "@prisma/client";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";

export type projetInfoType = {
    name: string,
    id: string,
    icon: ProjectIcons
}

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
        <Tasks 
            projectInfo={ {name: project.name, icon: project.icon, id: project.id} } 
            sprints={ project.sprints }
            tasks={ project.tasks } 
        />
    )
}