"use server"

import { auth } from "../auth";
import { prisma } from "../prisma";
import { FuncResponseType } from "../types";
import { EditSprintSchema, EditSprintSchemaType } from "../zod/editSprint"


export default async function editSprintServer({
    data,
    id
} : {
    data: EditSprintSchemaType,
    id: string
}): Promise<FuncResponseType>{
    const res = EditSprintSchema.safeParse(data);
    const session = await auth();

    if(res.error || !session?.user.id){
        return {sucess: false, message: "Invalidated data!"};
    
    } else if(session.user.role == "Member"){
        return {sucess: false, message: "Not authorized!"};
    }

    const sprint = await prisma.sprint.findUnique({where: {id} });

    if(!sprint){
        return {sucess: false, message: "Sprint not found!"};
    }

    const projectMember = await prisma.projectMember.findUnique({
        where: {
            userId_projectId: {
                userId: session.user.id,
                projectId: sprint.projectId
            }
        }
    });

    if(!projectMember) return {sucess: false, message: "You are not part of this project!"};

    try {
        const validData = res.data;

        await prisma.sprint.update({
            where: {id: sprint.id},
            data: {
                ...validData,
            }
        })

        return {sucess: false, message: "Sprint edited successfully."};

    } catch (error) {
        return {sucess: false, message: "Internal database error!"};
    }


}