import { prisma } from "../prisma";
import { PageProjectsType } from "../types";

export const getPageProjects = async({id} : {id: string}): Promise<PageProjectsType[]> => {
    const projects = await prisma.project.findMany({
        where: {
            members: { some: {userId: id} }
        },

        include: {
            members: {
                select: {
                    user: {
                        select: {
                            image: true
                        }
                    }
                }
            }
        }
    });

    return projects;
}

export const getSidebarProjects = async({id} : {id: string}) => {
    const projects = await prisma.project.findMany({
        where: {
            members: {
                some: { userId: id },
            },
        },
    });

    return projects;
}