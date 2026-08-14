"use server"

import { auth } from "../auth";
import { prisma } from "../prisma";
import { FuncResponseType } from "../types";
import { EditTaskSchema, EditTaskSchemaType } from "../zod/editTask";

export default async function EditTaskFunc({
    data,
    id,
} : {
    data: EditTaskSchemaType,
    id: string

}): Promise<FuncResponseType> {

    const session = await auth();
    const res = EditTaskSchema.safeParse(data);

    if(res.error || !session?.user?.id){
        return { sucess: false, message: "Invalid data!" };
    
    } else if(session.user.role == "Member"){
        return { sucess: false, message: "Not authorized!" };
    }

    const projectId = await prisma.task.findUnique({
        where: {id},

        select: {
            id: true,
        }
    })

    if(!projectId){
        return { sucess: false, message: "Task not found!" };
    }

    try {
        const {user, ...data} = res.data;
        
        await prisma.task.update({
            where: { id: projectId.id },
            data: {
                ...data,
                userId: user?.id
            }
        });

    return { sucess: true, message: "Task edited successfully." };

    } catch (error) {
        return { sucess: false, message: "Internal database error!" };
    }
    
}