import { SetTitlePage } from "@/components/topbar/setTitlePage";
import { prisma } from "@/lib/prisma";

type ProjectPageType = {
    id: string
}

export default async function ProjectPage({params} : {params: Promise<ProjectPageType>}){
    const { id } =  await params;

    const project = await prisma.project.findUnique({where: {id}});

    return (
        <>
            <SetTitlePage title={project?.name ?? ""} />
            {id}
        </>
    )
}