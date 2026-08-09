"use server"

import { prisma } from "@/lib/prisma";
import { ProjectOverviewType } from "@/lib/types";

export default async function getProjectPage({url, userId} : {url: string, userId: string}): Promise<ProjectOverviewType | null>{
    const projects = await prisma.project.findUnique({
        where: {
            url,
            members: {
                some: { userId }
            }
        },
        include: {
            tasks: {
                include: {
                    user: true,
                    
                    project: {
                        select: {
                            name: true,
                            icon: true
                        }
                    },
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