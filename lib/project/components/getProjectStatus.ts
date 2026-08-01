import { Task } from "@prisma/client";

export function getProjectStatus({tasks} : {tasks: Task[]}){
    const status = [
        { 
            label: "To Do", 
            count: tasks.length, 
            color: "#6b7280" 
        },
        
        {
            label: "In Progress",
            count: tasks.filter((t) => t.status === "InProgress").length,
            color: "#6d6ef7",
        },

        {
            label: "In Revision",
            count: tasks.filter((t) => t.status === "InReview").length,
            color: "#f59e0b",
        },

        { label: "Completed", count: tasks.filter((t) => t.status === "Completed").length, color: "#10b981" },
    ];

    return status;
}