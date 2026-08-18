import { SetTitlePage } from "@/components/topbar/setTitlePage";
import { ProjectUrlParamstype } from "../page";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import getSprintsPage from "@/lib/sprint/getSprintsPage";
import ProjectSprintComponent from "@/components/projects/sprints/sprints";

export default async function ProjectSprintsPage({params}: ProjectUrlParamstype){
    const { url } = await params;
    const session = await auth();
    
    if(!session?.user?.id){
        return notFound();
    }

    const valitedUrl = url
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    const project = await getSprintsPage({url: valitedUrl, userId: session.user.id});

    if(!project){
        notFound();
    }

    return (
        <>
            <SetTitlePage title={"Sprints"} />

            <ProjectSprintComponent 
                sprints={project.sprints} 
                projectInfo={{name: project.name, icon: project.icon, id: project.id}}  
            />
        </>
    )
}