"use client"

import { ProjectDataType } from "@/components/providers/projectProvider";
import useProjectData from "@/lib/hooks/projectProps";
import { ProjectViewIcon, projectViewIcons } from "@/lib/project/data";
import { ProjectOverviewType } from "@/lib/types";
import Link from "next/link";

export default function ProjectViewButton({
    view,
    project,
} : {
    view: { icon: ProjectViewIcon, label: string, description: string, url: "sprints" | "tasks" },
    project: ProjectOverviewType,
}){
    
    const ViewIcon = projectViewIcons[view.icon];

    const { setData } = useProjectData();
    
    const passProps = () => {
        const sprints = project.sprints.map(({name, id}) => ({name, id}));

        const newData: ProjectDataType = { 
            tasks: project.tasks, 
            sprints: sprints, 

            projectInfo: {
                name: project.name, 
                icon: project.icon,
                id: project.id,
            } 
        };

        setData(newData);
    };

    return (
        <Link
            onClick={() => passProps()}
            href={`/projects/${project.url}/${view.url}`}
            className={`rounded-xl p-4 text-left transition-all group bg-(--card) border border-(--border)
            hover:bg-(--accent) hover:border-(--primary) cursor-pointer`} 
        >
            <div className="mb-3 text-(--primary)">
                <ViewIcon size={16} />
            </div>

            <p className="text-sm font-semibold text-(--foreground)">
                {view.label}
            </p>

            <p className="text-xs mt-0.5 text-(--muted-foreground)">
                {view.description}
            </p>
        </Link>
    )
}