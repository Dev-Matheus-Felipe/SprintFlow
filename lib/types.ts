import { Prisma } from "@prisma/client";

// ------------------------------------------ FUNCTIONS RESPONSE ------------------------------------------ //

export type FuncResponseType = {
    sucess: boolean,
    message: string
}

// ------------------------------------------ PROJECT ------------------------------------------ //

export type PageProjectsType = Prisma.ProjectGetPayload<{
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