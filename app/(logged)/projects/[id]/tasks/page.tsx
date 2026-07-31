import Tasks from "@/components/projects/tasks/tasks";
import { auth } from "@/lib/auth";
import getTaskPage from "@/lib/project/pages/getTaskPage";
import {ProjectTaskPageType } from "@/lib/types";
import { notFound } from "next/navigation";

type TaskParams = {
    params: Promise<{
        id: string
    }>
}

export default async function ProjectTasksPage({params} : TaskParams){
     const { id } =  await params;
    const session = await auth();
    
    if (!/^[0-9a-fA-F]{24}$/.test(id) || !session?.user?.id) {
        return notFound();
    }
    
    const project: ProjectTaskPageType | null = await getTaskPage({id: id, userId: session.user.id});
    if(!project) notFound();
    
    return (
        <Tasks tasks={project.tasks } projectInfo={{name: project.name, icon: project.icon}} />
    )
}