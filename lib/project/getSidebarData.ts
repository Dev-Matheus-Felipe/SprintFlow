import { Project } from "@prisma/client";
import { prisma } from "../prisma";

export const getSidebarProjects = async({id} : {id: string}): Promise<Project[]> => {
    const projects = await prisma.project.findMany({
        where: {
            members: {
                some: { userId: id },
            },
        },
    });

    return projects;
}