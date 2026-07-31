import { prisma } from "@/lib/prisma";
import { ProjectTaskPageType } from "@/lib/types";

export default async function getTaskPage({id, userId} : {id: string, userId: string}): Promise<ProjectTaskPageType | null> {
    return await prisma.project.findUnique({
        where: {
            id,
            members: { some: { userId } }
        },
        
        include: {
            tasks: true
        }
    });
}