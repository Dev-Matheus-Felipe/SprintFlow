"use server"

import { prisma } from "@/lib/prisma";
import { SprintPage } from "@/lib/types";

export default async function getSprintsPage({url, userId} : {url: string, userId: string}): Promise<SprintPage | null> {
    const projects = await prisma.project.findUnique({
        where: {
            url,
            members: { some: { userId } }
        },
        
        include: {
            sprints: {
                include: {
                    tasks: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    });

    return projects;
}