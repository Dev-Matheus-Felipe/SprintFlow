"use client"

import { ProjectOverviewType } from "@/lib/types";
import { Plus } from "lucide-react";
import Banner from "./banner";
import { views } from "@/lib/project/data";
import SprintComponent from "./sprint";
import MemberComponent from "./member";

export default function ProjectOverview({project} : {project: ProjectOverviewType}){
    const projectSprints = project.sprints;
    
    return (
        <div className="flex-1 overflow-y-auto">

            {/* MAIN INFO - BANNER */}
            <Banner project={project} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Views */}
                <div className="lg:col-span-2">

                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Visualizações
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {views.map((v) => {
                        const ViewIcon = v.icon;

                        return (
                            <button
                                key={v.label}
                                className={`rounded-xl p-4 text-left transition-all group bg-(--card) border border-(--border)
                                hover:bg-(--accent) hover:border-(--primary)`} 
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
                        );
                    })}
                    </div>
                    

                {/* Sprints */}
                <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                    Sprints
                </h3>
                    
                <div className="space-y-2">
                    {projectSprints.map((sprint) => {
                        const sprintTasks = project.tasks.filter((t) => t.sprintId === sprint.id);
                        const sprintDone = sprintTasks.filter((t) => t.status === "CONCLUIDO").length;

                        return (
                            <SprintComponent 
                                sprint={sprint}
                                tasksLength={sprintTasks.length}
                                sprintDone={sprintDone}
                            />
                        );

                    })}
                    </div>
                </div>

                {/* Members */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-(--foreground)">
                            Membros ({project.members.length})
                        </h3>

                        <button className="flex items-center gap-1 text-xs transition-colors text-(--primary)">
                            <Plus size={12} />
                            Convidar
                        </button>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-(--card) border border-(--border)">
                        {project.members.map((member, i) => (
                            <MemberComponent member={member} i={i} size={project.members.length} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}