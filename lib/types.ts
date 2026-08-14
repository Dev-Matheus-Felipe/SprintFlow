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
        status: true,
        url: true
    }
}>

export type ProjectOverviewType = Prisma.ProjectGetPayload<{
    include: {
        tasks:  {
            select: {
                id: true,
                status: true
            }
        },

        sprints: {
            include: {
                tasks: {
                    select: {
                        id: true,
                        status: true
                    }
                }
            }
        },

        members: {
            select: {
                user: true,
                role: true,
            }
        }
    }
}>

// ------------------------------------------ TASKS ------------------------------------------ //

export type TaskPageDataType = Prisma.TaskGetPayload<{
    include: {
        user: true,
    }
}>

export type ProjectTaskPageType = Prisma.ProjectGetPayload<{
    include: {
        tasks: {
            include: {
                user: true,
            }
        },

        sprints: {
            select: {
                name: true,
                id: true
            }
        }
    }
}>

// ------------------------------------------ SPRINTS ------------------------------------------ //


export type SprintPage = Prisma.ProjectGetPayload<{
    include: {
        sprints: {
            include: {
                tasks: {
                    include: {
                        user: true
                    }
                }
            }
        }
    }
}>

export type ProjectSprints = Prisma.SprintGetPayload<{
    include: {
        tasks: {
            include: {
                user: true
            }
        }
    }
}>