import { Prisma } from "@prisma/client";

// ------------------------------------------ FUNCTIONS RESPONSE ------------------------------------------ //

export type FuncResponseType = {
    sucess: boolean,
    message: string
}

// ------------------------------------------ PROJECT ------------------------------------------ //

export type AllProjectsType = Prisma.ProjectGetPayload<{
    include: {
        members: {
            select: {
                user: {
                    select: {
                        image: true,
                        id: true,
                        name: true,
                    }
                }
            }
        },

        tasks: true
    }
}>

export type SidebarProjectsType = Prisma.ProjectGetPayload<{
    select: {
        name: true,
        color: true,
        id: true,
        status: true
    }
}>

export type ProjectOverviewType = Prisma.ProjectGetPayload<{
    include: {
        tasks: true,
        sprints: true,
        members: {
            select: {
                user: true,
                role: true,
            }
        }
    }
}>