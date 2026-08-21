"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FuncResponseType } from "@/lib/types";
import { NewTaskSchema, NewTaskSchemaType } from "@/lib/zod/newTaskSchema";


export default async function postNewTassk({
    data,
    projectId
} : {
    data: NewTaskSchemaType,
    projectId: string,
}): Promise<FuncResponseType>{

    const session = await auth();
    const valid = NewTaskSchema.safeParse(data);

    const validProjectId = await prisma.project.findUnique({where: {id: projectId}, select: {id: true}});

    if(valid.error || !session?.user?.id || !validProjectId){
        return {sucess: false, message: "Invalidated information!"};
    
    }

    const user = await prisma.projectMember.findUnique({
        where: {
            userId_projectId: {
                userId: session.user.id,
                projectId: validProjectId.id
            }
        }
    });

    if(!user || user.role == "Member"){
        return { sucess: false, message: "Not allowed" };
    }

    try {
        const { points, sprint, ...task } = valid.data;

        await prisma.task.create({
            data: {
                ...task,
                points: parseInt(points),
                sprintId: sprint?.id,
                projectId: validProjectId.id
            
            }
        })

        return { sucess: true, message: "Task created successfully." };

    } catch (error) {
        return { sucess: false, message: "Internal database error!" };
    }
}