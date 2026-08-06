"use server"

import { prisma } from "@/lib/prisma";
import { ProjectTaskPageType } from "@/lib/types";

export default async function getTaskPage({url, userId} : {url: string, userId: string}): Promise<ProjectTaskPageType | null> {
    return await prisma.project.findUnique({
        where: {
            url,
            members: { some: { userId } }
        },
        
        include: {
            tasks: {
                include: {
                    user: true
                }
            },
            sprints: true
        }
    });
}