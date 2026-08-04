import { prisma } from "../../prisma";
import { SidebarProjectsType } from "../../types";

export const getSidebarProjects = async({id} : {id: string}): Promise<SidebarProjectsType[]> => {
    const projects = await prisma.project.findMany({
        where: {
            members: {
                some: { userId: id },
            },
        },
        
        select: {
            name: true,
            color: true,
            id: true,
            status: true,
            url: true,
        }
    });

    return projects;
}