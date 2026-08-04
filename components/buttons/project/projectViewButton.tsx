"use client"

import { ProjectDataType } from "@/components/providers/projectProvider";
import useProjectData from "@/lib/hooks/projectProps";
import { ProjectViewIcon, projectViewIcons } from "@/lib/project/data";
import { ProjectOverviewType } from "@/lib/types";
import Link from "next/link";

export default function ProjectViewButton({
    v,
    project,
} : {
    v: { icon: ProjectViewIcon, label: string, description: string, url: "sprints" | "tasks" },
    project: ProjectOverviewType,
}){
    
    const ViewIcon = projectViewIcons[v.icon];

    const { setData } = useProjectData();

    const passProps = () => {
        const newData: ProjectDataType = { 
            tasks: [], 
            sprints: [], 
            projectInfo: {
                name: project.name, 
                icon: project.icon
            } 
        };

        if(v.url == "tasks") newData.tasks = project.tasks;
        else newData.sprints = project.sprints;

        setData(newData);
    };

    return (
        <Link
            onClick={() => passProps()}
            href={`/projects/${project.url}/${v.url}`}
            className={`rounded-xl p-4 text-left transition-all group bg-(--card) border border-(--border)
            hover:bg-(--accent) hover:border-(--primary) cursor-pointer`} 
        >
            <div className="mb-3 text-(--primary)">
                <ViewIcon size={16} />
            </div>

            <p className="text-sm font-semibold text-(--foreground)">
                {v.label}
            </p>

            <p className="text-xs mt-0.5 text-(--muted-foreground)">
                {v.description}
            </p>
        </Link>
    )
}