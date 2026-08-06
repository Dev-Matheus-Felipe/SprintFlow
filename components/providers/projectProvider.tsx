"use client"

import { TaskPageDataType } from "@/lib/types";
import { Sprint, Task } from "@prisma/client";
import { createContext, Dispatch, useState } from "react"

type ProjectProviderType = {
    data: ProjectDataType | null;
    setData: Dispatch<React.SetStateAction<ProjectDataType | null>>;
};

export type ProjectInfoType = {
    name: string,
    id: string,
    icon: "Zap" | "Rocket" | "Palette" | "RefreshCw" | "Smartphone" | "Globe" | "Shield" | "ChartColumn"
}

export type ProjectDataType = {
    tasks: TaskPageDataType[],
    sprints: Sprint[],

    projectInfo: ProjectInfoType
};

export const ProjectContext = createContext<ProjectProviderType | null>(null);

export default function ProjectProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [data, setData] = useState<ProjectDataType | null>(null);

    return (
        <ProjectContext.Provider value={{ data, setData }}>
            {children}
        </ProjectContext.Provider>
    );
}