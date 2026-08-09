import { TaskPriorities, TaskStatus } from "@prisma/client";
import z from "zod";

export const EditTaskSchema = z.object({
    status: z.enum(TaskStatus),
    priority: z.enum(TaskPriorities),
});



export type EditTaskSchemaType = z.infer<typeof EditTaskSchema>;