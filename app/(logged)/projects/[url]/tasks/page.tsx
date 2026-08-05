import Tasks from "@/components/projects/tasks/tasks";
import { auth } from "@/lib/auth";
import getTaskPage from "@/lib/project/pages/getTaskPage";
import {ProjectTaskPageType } from "@/lib/types";
import { notFound } from "next/navigation";
import { ProjectUrlParamstype } from "../page";

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
        <Tasks tasks={project.tasks } sprints={project.sprints} projectInfo={{name: project.name, icon: project.icon}} />
    )
}