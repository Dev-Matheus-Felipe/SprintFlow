import { prisma } from "@/lib/prisma";
import { AllProjectsType } from "@/lib/types";


export const getAllProjects = async({id} : {id: string}): Promise<AllProjectsType[]> => {
    const projects = await prisma.project.findMany({
        where: {
            members: { some: {userId: id} }
        },

        include: {
            members: {
                select: {
                    user: {
                        select: {
                            image: true,
                            id: true,
                            name: true
                        }
                    }
                }
            },

            tasks: true,
        }
    });

    return projects;
}