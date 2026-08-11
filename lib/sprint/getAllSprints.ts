"use server"

import { ProjectRoles } from "@prisma/client";
import { auth } from "../auth"
import { prisma } from "../prisma"

export default async function getAllProjectSprints({id} : {id: string}): Promise<{
    sprints: {name: string, id: string}[], 
    role: ProjectRoles
}>{
    const session = await auth();
    if(!session?.user?.id){
        return {sprints: [], role: "Member"};
    }
    
    try {
        const sprints = await prisma.sprint.findMany({
            where: {projectId: id},
            select: {
                name: true,
                id: true
            }
        });

        const role = await prisma.projectMember.findUnique({
            where: {
                userId_projectId: {
                    userId: session.user.id,
                    projectId: id
                }
            },

            select: {
                role: true
            }
        });
        
        if(!role) throw new Error("Member not found");

        return {sprints, role: role.role};

    } catch (error) {
        return {sprints: [], role: "Member"};
    }
}