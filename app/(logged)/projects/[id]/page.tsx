import ProjectOverview from "@/components/projects/projectOverview/projectOverview";
import { SetTitlePage } from "@/components/topbar/setTitlePage";
import { auth } from "@/lib/auth";
import getProjectPage from "@/lib/project/pages/getPageProject";
import { ProjectOverviewType } from "@/lib/types";
import { notFound } from "next/navigation";

type ProjectPageType = {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectPage({params} : ProjectPageType){
    const { id } =  await params;
    const session = await auth();

    if (!/^[0-9a-fA-F]{24}$/.test(id) || !session?.user?.id) {
        return notFound();
    }

    const project: ProjectOverviewType | null = await getProjectPage({id: id, userId: session.user.id});
    if(!project) notFound();

    return (
        <>
            <SetTitlePage title={project?.name ?? ""} />
            <ProjectOverview project={project} />
        </>
    )
}