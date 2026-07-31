import { prisma } from "@/lib/prisma";
import { ProjectOverviewType } from "@/lib/types";

export default async function getProjectPage({id, userId} : {id: string, userId: string}): Promise<ProjectOverviewType | null>{
    const projects = await prisma.project.findUnique({
        where: {
            id,
            members: {
                some: { userId }
            }
        },
        include: {
            tasks: {
                include: {
                    project: {
                        select: {
                            name: true,
                            icon: true
                        }
                    }
                }
            },
            sprints: true,
            members: {
                select: {
                    user: true,
                    role: true,
                }
            }
        }
    });
    
    return projects;
}