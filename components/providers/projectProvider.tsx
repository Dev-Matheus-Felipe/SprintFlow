"use client"

import { ProjectSprints, TaskPageDataType } from "@/lib/types";
import { createContext, Dispatch, useState } from "react"


type ProjectProvidersDataType = {
    projectId: string,
    
    task?: TaskPageDataType,

    sprint?: ProjectSprints,
    sprints: { name: string, id: string }[]
}

type ProjectProviderType = {
    data: ProjectProvidersDataType;
    setData: Dispatch<React.SetStateAction<ProjectProvidersDataType>>;
};

export const ProjectCotext = createContext<ProjectProviderType | null>(null);


export default function ProjectProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [data, setData] = useState<ProjectProvidersDataType>({sprints: [], projectId: ""});

    return (
        <ProjectCotext.Provider value={{ data, setData }}>
            {children}
        </ProjectCotext.Provider>
    );
}