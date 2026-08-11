import ProjectOverview from "@/components/projects/projectOverview/projectOverview";
import { SetTitlePage } from "@/components/topbar/setTitlePage";
import { auth } from "@/lib/auth";
import getProjectPage from "@/lib/project/pages/getPageProject";
import getMember from "@/lib/task/getMember";
import { ProjectOverviewType } from "@/lib/types";
import { notFound } from "next/navigation";

export type ProjectUrlParamstype = {
    params: Promise<{
        url: string;
    }>;
}

export default async function ProjectPage({params} : ProjectUrlParamstype){
    const { url } =  await params;
    const session = await auth();
    
    if (!session?.user?.id) {
        return notFound();
    }

    const valitedUrl = url
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    
    const project: ProjectOverviewType | null = await getProjectPage({url: valitedUrl, userId: session.user.id});
    const role = await getMember({userId: session.user.id, projectId: project?.id ?? ""});
    if(!project || !role) notFound();
    
    return (
        <>
            <SetTitlePage title={project.name} />
            <ProjectOverview project={project} role={role?.role} />
        </>
    )
}