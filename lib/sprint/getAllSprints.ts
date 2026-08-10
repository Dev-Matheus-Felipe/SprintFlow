"use server"

import { auth } from "../auth"
import { prisma } from "../prisma"

export default async function getAllSprints({id} : {id: string}): Promise<{name: string, id: string}[]>{
    const session = await auth();
    if(!session?.user){
        return [];
    }
    
    try {
        const sprints = await prisma.sprint.findMany({
            where: {projectId: id},
            select: {
                name: true,
                id: true
            }
        });

        return sprints;

    } catch (error) {
        return [];
    }
}