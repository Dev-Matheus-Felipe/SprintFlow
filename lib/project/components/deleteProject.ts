"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FuncResponseType } from "@/lib/types";

export default async function deleteProjectAction({projectId} : {projectId: string}): Promise<FuncResponseType>{
    const session = await auth();

    if(!session?.user?.id){
        return {sucess: false, message: "Not logged!"};
    }

    const member = await prisma.projectMember.findUnique({
        where: {
            userId_projectId: {
                userId: session.user.id,
                projectId
            }
        }
    });

    if(!member || member.role != "Owner"){
        return {sucess: false, message: "Not allowed"};
    }

    try {
        await prisma.project.delete({
            where: {
                id: member.projectId
            }
        });

        return {sucess: true, message: "Project deleted successfully."};

    } catch (error) {

        return {sucess: false, message: "Internal database error!"};
    }
}