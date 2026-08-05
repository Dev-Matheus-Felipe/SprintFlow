import z from "zod"

export const NewSprintSchema = z.object({
    name: z
        .string("Not a String")
        .min(3, "Too short!")
        .max(30, "Max length: 30"),

    objective: z
        .string("Not a String")
        .min(3, "Too short!")
        .max(200, "Max length: 200"),

    startAt: z.date("Not a valid date"),
    endAt:   z.date("Not a valid date")
})


export type NewSprintSchemaType = z.infer<typeof NewSprintSchema>;