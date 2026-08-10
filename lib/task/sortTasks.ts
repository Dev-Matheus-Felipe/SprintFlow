import { TaskPriorities } from "@prisma/client";
import { TaskPageDataType } from "../types";

const priorityOrder: Record<TaskPriorities, number> = {
    [TaskPriorities.Critical]: 0,
    [TaskPriorities.High]: 1,
    [TaskPriorities.Medium]: 2,
    [TaskPriorities.Low]: 3,
};

export default function sortTasks({tasks, type} : {tasks: TaskPageDataType[], type: string}): TaskPageDataType[]{
    console.log(type);
    return [...tasks].sort((a, b) => {
        switch(type){
            case "Most recent":
                return b.createdAt.getTime() - a.createdAt.getTime();
            
            case "Deadline":
                return a.deadline.getTime() - b.deadline.getTime();

            case "Priority":
                return priorityOrder[a.priority] - priorityOrder[b.priority];

            default: return 0;
        }
    })
}