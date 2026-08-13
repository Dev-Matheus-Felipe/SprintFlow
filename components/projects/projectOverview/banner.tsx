"use client"

import useModal from "@/lib/hooks/newProject";
import { getProjectStatus } from "@/lib/project/components/getProjectStatus";
import { ProjectIcons } from "@/lib/project/data";
import { ProjectOverviewType } from "@/lib/types";
import { ProjectRoles } from "@prisma/client";
import { Settings, UserPlus } from "lucide-react";

export default function Banner({
    project,
    role
} : {
    project: ProjectOverviewType,
    role: ProjectRoles
}){
    const { setStatus } = useModal();

    const projectStatus = getProjectStatus({tasks: project.tasks});    

    // completed tasks and progress data
    const done = project.tasks.filter((t) => t.status === "Completed").length;
    const progress = project.tasks.length > 0 ? Math.round((done / project.tasks.length) * 100) : 0;

    // icon
    const ICON = ProjectIcons.get(project.icon)!;

    return (
        <div className="rounded-xl p-6 mb-6 relative overflow-hidden bg-(--card) border border-(--border)">
            <div className="flex flex-1 flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                        style={{ background: project.color  }}
                    >
                    
                        <ICON size={30} />
                    </div>
                    
                    <div className="flex-1">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-xl font-bold text-(--foreground)">
                                {project.name}
                            </h2>

                            <button
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors 
                                text-(--muted-foreground) cursor-pointer hover:bg-(--primary) hover:text-(--foreground)`}
                            >

                                <Settings size={15} />
                            </button>
                        </div>

                        <p className="lg:text-sm text-xs mt-2 max-w-lg text-(--muted-foreground)">
                            {project.description}
                        </p>

                    </div>
                </div>
                
                {
                    role != "Member" &&
                        <button
                            onClick={() => setStatus({component: "newUser", open: true})}
                            className={`sm:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                            bg-(--secondary) text-(--foregroubd) border border-(--border) cursor-pointer 
                            hover:bg-(--primary)`}
                        >

                        <UserPlus size={14} />
                        Invite User
                    </button>
                }

            </div>

            {/* Progress */}
            <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-(--muted-foreground)">General Progress</span>

                    <span className="text-sm font-semibold text-(--foreground)">
                        {progress}%
                    </span>
                </div>

                <div className="w-full h-2 rounded-full bg-(--muted)">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progress}%`, background: project.color }}
                    />
                </div>
            </div>

            {/* Task status breakdown */}
            <div className="flex items-center gap-1 justify-around mt-4">
                {projectStatus.map((s) => (
                    <div key={s.label} className="text-center">
                        <p className="text-lg font-bold" style={{ color: s.color }}>
                            {s.count}
                        </p>

                        <p className="sm:text-xs text-[8px] text-(--muted-foreground)">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}