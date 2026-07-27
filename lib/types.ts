import { Prisma } from "@prisma/client";

export type PageProjectsType = Prisma.ProjectGetPayload<{
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
}>