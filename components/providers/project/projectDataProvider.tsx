"use client"

import { ProjectSprints, TaskPageDataType } from "@/lib/types";
import { createContext, Dispatch, useState } from "react"


type ProjectProviderDataType = {
    projectId: string,
    
    task?: TaskPageDataType,

    sprint?: ProjectSprints,
    sprints: { name: string, id: string }[]
}

type ProjectProviderType = {
    data: ProjectProviderDataType;
    setData: Dispatch<React.SetStateAction<ProjectProviderDataType>>;
};

export const ProjectDataContext = createContext<ProjectProviderType | null>(null);


export default function ProjectDataProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [data, setData] = useState<ProjectProviderDataType>({sprints: [], projectId: ""});

    return (
        <ProjectDataContext.Provider value={{ data, setData }}>
            {children}
        </ProjectDataContext.Provider>
    );
}