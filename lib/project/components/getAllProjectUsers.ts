"use server"

import { AllProjectUserType } from "@/components/projects/tasks/setUserTask";
import { prisma } from "@/lib/prisma"



export default async function getAllProjectUsers({projectId} : {projectId: string}): Promise<AllProjectUserType[]>{
    const members = await prisma.projectMember.findMany({
        where: {
            projectId,
        },

        include: {
            user: true
        }
    });

    const users: AllProjectUserType[] = 
        members.map(member => ({name: member.user.name, id: member.user.id, image: member.user.image ?? ""}));

    return users;
}