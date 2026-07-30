"use server"

import { prisma } from "../../prisma"

export default async function getProjectName({id} : {id: string}): Promise<{name: string} | null>{
    return await prisma.project.findUnique({
        where: {id},
        select: {name: true}
    });
}