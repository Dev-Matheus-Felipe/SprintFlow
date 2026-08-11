"use server"

import { prisma } from "../prisma"

export default async function getMember({userId, projectId} : {userId: string, projectId: string}){
    return await prisma.projectMember.findUnique({
        where: {
            userId_projectId: {
                userId, projectId
            }
        },

        select: {
            role: true
        }
    })
}