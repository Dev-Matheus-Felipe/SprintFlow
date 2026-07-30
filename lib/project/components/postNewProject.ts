"use server"

import z from "zod";
import { FuncResponseType } from "../../types";
import { newProjectSchema, newProjectSchemType } from "../../zod/newProjectSchema";
import { auth } from "../../auth";
import { prisma } from "../../prisma";

export default async function postNewProject({data} : {data: newProjectSchemType}): Promise<FuncResponseType> {
    const res = z.safeParse(newProjectSchema, data);
    const session = await auth();
    
    if(!res.success || !session?.user?.id)
        return {sucess: false, message: "Incompatible Informations"};

    try {
        const validatedData = res.data;

        const project = await prisma.project.create({
            data: {
                ...validatedData,
                status: "ATIVO",
            }
        });

        await prisma.projectMember.create({
            data: {
                role: "OWNER",
                projectId: project.id,
                userId: session.user.id
            }
        });

        return {sucess: true, message: "Project created successfully!"};
        
    } catch (error) {
        return {sucess: false, message: "Internal databse error, try again later!"};
    }
}