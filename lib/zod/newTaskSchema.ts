import { TaskPriorities, TaskStatus } from "@prisma/client";
import z, { object } from "zod";

export const avaliablePoints = ["1","2","3","5","8","13","21"] as const;

export const NewTaskSchema = z.object({
    status: z.enum(TaskStatus),
    priority: z.enum(TaskPriorities),
    points: z.enum(avaliablePoints),
    deadline: z.date(),
    description: z
        .string("Must be a string")
        .min(3, "Too short!")
        .max(200, "Max Length: 200"),
    
    sprint: z
        .object({
            name: z.string(),
            id: z.string()
        })
        .optional()
});

export type NewTaskSchemaType = z.infer<typeof NewTaskSchema>;