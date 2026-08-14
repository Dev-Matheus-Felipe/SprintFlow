"use client"

import { ProjectIcons } from "@/lib/project/data";
import { Plus } from "lucide-react";
import useModal from "@/lib/hooks/newProject";
import { ProjectRoles } from "@prisma/client";
import { projetInfoType } from "@/app/(logged)/projects/[url]/tasks/page";

export default function TaskSprintHeader({
    projectInfo,
    length,
    type,
    role,
} : {
    projectInfo: projetInfoType,
    length: number,
    type: "Task" | "Sprint",
    role: ProjectRoles
}){

    const { setStatus } = useModal();
    const ICON = ProjectIcons.get(projectInfo.icon)!;

    return (
        <div className="flex items-center gap-3 mb-3 flex-wrap max-xs:flex-col max-xs:gap-5 xs:justify-between">
            <div className="flex gap-3">
                <ICON size={16} color="var(--muted-foreground)" />

                <span className="text-sm text-(--muted-foreground)">
                    {projectInfo.name}
                </span>

                <span className="text-(--border)">/</span>

                <span className="text-sm font-medium text-(--foreground)">
                    {type}s
                </span>

                <span className="text-xs px-2 py-0.5 rounded font-medium text-(--muted-foreground) bg-(--muted)">
                    {length}
                </span>
            </div>


            {   // ONLY ADMS CAN ADD NEW TASKS AND SPRINTS
                (role != "Member") &&
                    <button 
                        onClick={() => setStatus({component: (type == "Task" ? "newTask" : "newSprint"), open: true})}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium 
                        transition-colors bg-(--primary) text-(--primary-foreground) cursor-pointer`}
                    >
                        <Plus size={14} />
                        New {type}
                    </button>
            }
        </div>
    )
}