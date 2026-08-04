"use server"

import { auth } from "../auth";
import { prisma } from "../prisma";
import { FuncResponseType } from "../types";
import { NewSprintSchema, NewSprintSchemaType } from "../zod/newSprintSchema";

export default async function PostNewSprint({data, url} : {data: NewSprintSchemaType, url: string}): Promise<FuncResponseType>{
    const validatedData = NewSprintSchema.safeParse({data});
    const session = await auth();

    if(!session?.user || !validatedData)  return {sucess: false, message: "Invalidated Data"};

    const userId = session.user.id;
    const project = await prisma.project.findUnique({
        where: {
            url,
            members: {
                some: { userId }
            }
        }
    });

    if(!project) return {sucess: false, message: "Project not Found"};

    try {
        await prisma.sprint.create({
            data: {
                ...data,
                situation: "Planning",
                projectId: project.id
            }
        })

        return {sucess: true, message: "Sprint created successfully"};

    } catch (error) {
        return {sucess: false, message: "Internal Database Error"};
    }

}