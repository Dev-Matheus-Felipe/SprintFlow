"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FuncResponseType } from "@/lib/types";
import { NewUserSchema, NewUserSchemaType } from "@/lib/zod/newUserSchema";


export default async function addNewUser({
    projectId,
    formData
} : {
    projectId: string,
    formData: NewUserSchemaType
}) : Promise<FuncResponseType> {

    const session = await auth();
    const res = NewUserSchema.safeParse(formData);

    if(!session?.user?.id || res.error){
        return { sucess: false, message: "Invalid Informations" };
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: {
            id: true,
            members: true
        }
    });

    const validData = res.data;
    const user = await prisma.user.findUnique({where: {email: validData.email}});


    if(!project || !user) {
        return { sucess: false, message: "Data not found! " };
    
    } else if(project.members.find(member => member.userId == user.id)){
        return { sucess: false, message: "User already has added!" };
    }

    try {
        await prisma.projectMember.create({
            data: {
                userId: user.id,
                projectId: project.id,
                role: validData.role
            }
        })

        return { sucess: true, message: "User added successfully." };

    } catch (error) {
        return { sucess: false, message: "Internal database error" };
    }
}