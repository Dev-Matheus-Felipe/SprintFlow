"use client"

import { sprintStatus, sprintStatusBackground } from "@/lib/sprint/data"
import { ProjectSprints } from "@/lib/types"
import { ProjectRoles } from "@prisma/client"
import { Pencil, Play } from "lucide-react"

import { Prisma } from "@prisma/client"
import useModal from "@/lib/hooks/newProject"
import useProject from "@/lib/hooks/project"

type TaskWithUser = Prisma.TaskGetPayload<{
  include: {
    user: true
  }
}>

export default function ProjectSprintHeader({
    sprint,
    role,
    sprintTasks,
    done
} : {
    sprint: ProjectSprints,
    role: ProjectRoles,
    sprintTasks: TaskWithUser[],
    done: number
}){

    const { setStatus } = useModal();
    const { setData } = useProject();
    // DATE DIFF
    const diffMs = sprint.endAt.getTime() - sprint.startAt.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // PROGRESS BAR AND POINTS
    const progress = sprintTasks.length > 0 ? Math.round((done / sprintTasks.length) * 100) : 0;
    const totalPoints = sprintTasks.reduce((acc, t) => acc + t.points, 0);


    const completedPoints = sprintTasks
        .filter((t) => t.status === "Completed")
        .reduce((acc, t) => acc + t.points, 0);

    
    const viewSprint = () => {
        if(role == "Member") return;

        setData(prev => ({...prev, sprint: sprint}));
        setStatus({component: "editSprint", open: true});
    }

    return (
        <button 
            onClick={viewSprint}
            className={`px-5 py-4 border-b border-(--border) relative w-full
            ${role != "Member" && "hover:bg-(--muted) cursor-pointer group"}`}
        >
            <div className="hidden group-hover:block absolute right-3 top-3 z-5 bg-primary p-1.5 rounded">
                <Pencil size={12} />
            </div>

            <div className="flex max-sm:flex-col items-start justify-between">
                <div className="flex-1 items-start flex flex-col">
                    <div className="flex items-center gap-3 mb-1">
                        
                        <h3 className="text-base font-semibold text-(--foreground)">
                            {sprint.name}
                        </h3>

                        <Play size={14} />

                        <span 
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-center"
                            style={{ color: sprintStatus[sprint.situation], background: sprintStatusBackground[sprint.situation] }}
                        >
                            {sprint.situation}
                        </span>

                    </div>

                    {
                        sprint.objective && (
                            <p className="text-sm text-(--muted-foreground) py-2 text-start">
                                {sprint.objective}
                            </p>
                        )
                    }
                </div>

                <div className="text-right sm:ml-4 shrink-0">
                    <p className="text-xs text-(--muted-foreground)">
                        { sprint.startAt.toLocaleDateString("pt-BR") + " - "} 
                        
                        { sprint.endAt.toLocaleDateString("pt-BR") }
                    </p>

                    { sprint.situation === "Active" && (
                        <p
                            className="text-xs font-medium mt-0.5 "
                            style={{ color: diffDays < 0 ? "#ef4444" : "var(--muted-foreground)" }}
                        >
                            {diffDays ? `${diffDays} days left` : "Late!"}
                        </p>
                    )}
                </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-(--muted-foreground)">
                        {done}/{sprintTasks.length} tasks • {completedPoints}/{totalPoints} pts
                    </span>

                    <span className="text-xs font-semibold">
                        {progress}%
                    </span>
                </div>

                <div className="w-full h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                    <div
                        className="h-full rounded-full transition-all bg-(--primary)"
                        style={{ width: `${progress}%` }}
                    />

                </div>
            </div>
        </button>
    )
}