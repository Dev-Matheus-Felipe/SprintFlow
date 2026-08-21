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
        return { sucess: false, message: "Invalid informations!" };
    
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: {
            id: true,
            members: true
        }
    });

    const user = project?.members.find(m => m.userId == session.user?.id);

    if(!user || user.role == "Member"){
        return { sucess: false, message: "Not allowed!" };
    }

    const validData = res.data;
    const newUser = await prisma.user.findUnique({where: {email: validData.email}});

    if(!project || !newUser) {
        return { sucess: false, message: "Incompatible data!" };
    
    } else if(project.members.find(member => member.userId == newUser.id)){
        return { sucess: false, message: "The user already has been added!" };
    }

    try {
        await prisma.projectMember.create({
            data: {
                userId: newUser.id,
                projectId: project.id,
                role: validData.role
            }
        })

        return { sucess: true, message: "User added successfully." };

    } catch (error) {
        return { sucess: false, message: "Internal database error!" };
    }
}