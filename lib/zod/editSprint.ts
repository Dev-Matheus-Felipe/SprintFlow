import z from "zod";

export const sprintStatus = [
    "Planning",
    "Delayed",
    "Active",
    "Completed",
] as const;

export const EditSprintSchema = z.object({
    objective: z
        .string("Not a String")
        .min(3, "Too short!")
        .max(200, "Max length: 200"),

    endAt: z.date("Not a valid date"),
    
    situation: z.enum(sprintStatus)
});

export type EditSprintSchemaType = z.infer<typeof EditSprintSchema>;