import TaskSprintHeader from "../taskSprintHeader";
import { ProjectSprints } from "@/lib/types";
import Image from "next/image";
import { ProjectRoles } from "@prisma/client";
import { projetInfoType } from "@/app/(logged)/projects/[url]/tasks/page";
import ProjectSprintHeader from "./header";

export default function ProjectSprintComponent({
    sprints,
    projectInfo,
    role,
} : { 
    sprints: ProjectSprints[],
    projectInfo: projetInfoType,
    role: ProjectRoles,
}){

    return (
        <div className="flex-1 overflow-y-auto p-3 flex flex-col">
            <TaskSprintHeader 
                type="Sprint" 
                length={sprints.length} 
                projectInfo={projectInfo} 
                role={role}
            />
      
            {/* SPRINTS LIST */}
            <div className="space-y-4 mt-5">
                { sprints.map((sprint) => {
                
                // SPRINT TASKS
                const sprintTasks = sprint.tasks;

                // COMPLETED TASKS
                const inProgress = sprintTasks.filter((t) => t.status === "InProgress").length;
                const done = sprintTasks.filter((t) => t.status === "Completed").length;
                

                return (
                    <div
                        key={sprint.id}
                        className="rounded-xl overflow-hidden bg-(--card) border border-(--border)"
                    >

                    {/* HEADER */}
                    <ProjectSprintHeader 
                        sprint={sprint} 
                        role={role} 
                        sprintTasks={sprintTasks} 
                        done={done}
                    />

                    {/* TASK BREAKDOWN */}
                    <div className="px-5 py-3">
                        <div className="grid grid-cols-4 gap-2">
                        {[

                    { label: "To Do", count: sprintTasks.filter((t) => t.status === "Todo").length, color: "#6b7280" },
                    { label: "In Progress", count: inProgress, color: "#6d6ef7" },
                    { label: "In Revision", count: sprintTasks.filter((t) => t.status === "InReview").length, color: "#f59e0b" },
                    { label: "Concluded", count: done, color: "#10b981" },
                        
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-lg font-bold" style={{ color: s.color }}>
                                    {s.count}
                                </p>

                                <p className="text-xs text-(--muted-foreground)">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* TASKS LIST */}
                    { sprintTasks.length > 0 && (
                        <div className="px-5 py-3 space-y-1 border-t border-(--border)">
                            { sprintTasks.slice(0, 4).map((task) => {
                                const statusColors: Record<string, string> = {
                                    todo: "#6b7280", done: "#10b981",
                                    in_progress: "#6d6ef7", in_review: "#f59e0b", 
                                };

                                return (
                                    <div key={task.id} className="flex items-center gap-3 py-1">
                                        <span 
                                            className="w-1.5 h-1.5 rounded-full shrink-0" 
                                            style={{ background: statusColors[task.status] }} 
                                        />

                                        <span className="text-xs flex-1 truncate text-(--foreground)">
                                            {task.description}
                                        </span>

                                        {task.user && (
                                            <Image 
                                                src={task.user.image ?? ""} 
                                                alt={task.user.name} 
                                                width={20}
                                                height={20}
                                                className="w-5 h-5 rounded-full shrink-0" />
                                        )}

                                        <span className="text-xs shrink-0 text-(--muted-foreground)">
                                            {task.points}pts
                                        </span>
                                    </div>
                                );
                            })}

                            { sprintTasks.length > 4 && (
                                <p className="text-xs pt-1 text-(--muted-foreground)">
                                    +{sprintTasks.length - 4} tarefas
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ) })}
            </div>
        </div>
    )
}