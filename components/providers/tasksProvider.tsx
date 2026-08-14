"use client"

import { TaskPageDataType } from "@/lib/types";
import { createContext, Dispatch, useState } from "react"


type TasksDataType = {
    projectId: string,
    
    task?: TaskPageDataType,
    sprints: { name: string, id: string }[]
}

type ProjectProviderType = {
    data: TasksDataType;
    setData: Dispatch<React.SetStateAction<TasksDataType>>;
};

export const TaskContext = createContext<ProjectProviderType | null>(null);


export default function TaskProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [data, setData] = useState<TasksDataType>({sprints: [], projectId: ""});

    return (
        <TaskContext.Provider value={{ data, setData }}>
            {children}
        </TaskContext.Provider>
    );
}