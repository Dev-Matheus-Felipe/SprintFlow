"use server"

import { auth } from "../auth";
import { prisma } from "../prisma";
import { FuncResponseType } from "../types";
import { EditTaskSchema, EditTaskSchemaType } from "../zod/editTask";

export default async function EditTaskFunc({
    data,
    id,
    projectId,
} : {
    data: EditTaskSchemaType,
    id: string,
    projectId: string,

}): Promise<FuncResponseType> {

    const session = await auth();
    const res = EditTaskSchema.safeParse(data);

    if(res.error || !session?.user?.id){
        return { sucess: false, message: "Invalid data!" };
    
    }

    const taskId = await prisma.task.findUnique({
        where: {id},

        select: {
            id: true,
            userId: true
        }
    });


    if(!taskId){
        return { sucess: false, message: "Task not found!" };
    }

    const validUser = await prisma.projectMember.findUnique({
        where:{ 
            userId_projectId: {
                userId: session.user.id,
                projectId
            }
        }
    });

    if(!validUser || (validUser.role == "Member" && taskId.userId != session.user.id)){
        return { sucess: false, message: "Not allowed!" };
    }

    try {
        const {user, ...data} = res.data;
        
        if(validUser.role == "Member"){
            await prisma.task.update({
                where: { id: taskId.id },
                data: {
                    status: data.status
                }
            });

        } else {
            await prisma.task.update({
                where: { id: taskId.id },
                data: {
                    ...data,
                    userId: user?.id
                }
            });
        }

    return { sucess: true, message: "Task edited successfully." };

    } catch (error) {
        return { sucess: false, message: "Internal database error!" };
    }
    
}