import { ProjectColors, ProjectIcons } from '@prisma/client';
import {z} from 'zod'

export const newProjectSchema = z.object({
    name: z
        .string("Must exist")
        .trim()
        .max(20, "Max length: 20")
        .min(5, "Too short!"),

    description: z
        .string("Must exist")
        .trim()
        .max(250, "Max Length: 250")
        .min(10, "Too short!"),

    color: z
        .enum(ProjectColors, "Not a valid color!"),

    icon: z
        .enum(ProjectIcons, "Not a valid Icon!")
});


export type newProjectSchemType = z.infer<typeof newProjectSchema>;

