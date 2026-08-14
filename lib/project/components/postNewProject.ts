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
        return {sucess: false, message: "Incompatible informations!"};

    const url = res.data.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    const exists = await prisma.project.findUnique({where: {url}});
    
    if(exists){
        return {sucess: false, message: "Please try another name!"};
    }

    try {
        const validatedData = res.data;

        const project = await prisma.project.create({
            data: {
                ...validatedData,
                url: url,
                status: "Active",
            }
        });

        await prisma.projectMember.create({
            data: {
                role: "Owner",
                projectId: project.id,
                userId: session.user.id
            }
        });

        return {sucess: true, message: "Project created successfully!"};
        
    } catch (error) {
        return {sucess: false, message: "Internal databse error!"};
    }
}