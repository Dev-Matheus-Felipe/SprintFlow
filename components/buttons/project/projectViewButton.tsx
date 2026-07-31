"use client"

import { ProjectViewIcon, projectViewIcons } from "@/lib/project/data";

export default function ProjectViewButton({
    v,
} : {
    v: { icon: ProjectViewIcon, label: string, description: string },
}){
    const ViewIcon = projectViewIcons[v.icon];

    return (
        <button
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
        </button>
    )
}