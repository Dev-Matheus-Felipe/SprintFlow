"use server"

import { auth } from "../auth";
import { prisma } from "../prisma";
import { FuncResponseType } from "../types";
import { NewSprintSchema, NewSprintSchemaType } from "../zod/newSprintSchema";

export default async function PostNewSprint({data, url} : {data: NewSprintSchemaType, url: string}): Promise<FuncResponseType>{
    const validatedData = NewSprintSchema.safeParse({data});
    const session = await auth();

    if(!session?.user || !validatedData){
        return {sucess: false, message: "Invalidated data!"};
    
    } 

    const userId = session.user.id;
    const project = await prisma.project.findUnique({
        where: {
            url,
            members: {
                some: { userId }
            }
        },

        include: {
            members: true
        }
    });

    if(!project) return {sucess: false, message: "Project not found!"};

    const user = project.members.find(m => m.userId == session.user?.id);

    if(!user || user.role == "Member"){
        return { sucess: false, message: "Not allowed" };
    }

    try {
        await prisma.sprint.create({
            data: {
                ...data,
                situation: "Planning",
                projectId: project.id
            }
        })

        return {sucess: true, message: "Sprint created successfully."};

    } catch (error) {
        return {sucess: false, message: "Internal database error!"};
    }

}