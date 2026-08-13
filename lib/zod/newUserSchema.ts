import { ProjectRoles } from "@prisma/client";
import z, { email } from "zod";

export const NewUserSchema = z.object({
    email: z.email("Not a valid email"),
    role: z.enum(ProjectRoles)
});


export type NewUserSchemaType = z.infer<typeof NewUserSchema>;