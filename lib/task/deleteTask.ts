"use server"

import { auth } from "../auth"
import { prisma } from "../prisma";
import { FuncResponseType } from "../types"

export default async function DeleteTaskFunc({id} : {id: string}): Promise<FuncResponseType> {
    const session = await auth();

    if(!session?.user?.id){
        return {sucess: false, message: "Not logged!"};
    }

    const task = await prisma.task.findUnique({
        where: {id},
        
        select: {id: true}
    });

    if(!task){
        return {sucess: false, message: "Task not found."};
    }

    try {
        await prisma.task.delete({where: {id: task.id}});

        return {sucess: false, message: "Task deleted successfully. "};

    } catch (error) {
        return {sucess: false, message: "Internal Database Error."};
    }
}