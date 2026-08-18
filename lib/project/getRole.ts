"use server"

import { prisma } from "../prisma"


export default async function getRole({userId, url} : {userId: string, url: string}){
    return await prisma.projectMember.findFirst({
        where: {
            userId,

            project: {
                url
            }
        },

        select: {
            role: true,
        }
    });
}