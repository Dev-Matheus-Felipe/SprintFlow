"use server"

import { prisma } from "../prisma";
import { AllTasks } from "../types";

export default async function getAllTasks({userId} : {userId: string}): Promise<AllTasks[]>{
    const tasks = await prisma.task.findMany({
        where:{  userId },

        include: {
            project: {
                select: {
                    name: true,
                }
            },

            user: true,
        }
    });

    return tasks;
}