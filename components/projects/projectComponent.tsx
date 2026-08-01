import { ProjectIcons, statusColor } from "@/lib/project/data";
import { AllProjectsType } from "@/lib/types";
import { CheckCircle2, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectComponent({project} : {project: AllProjectsType}){

    // tasks amount
    const projectTasks = project.tasks;

    // completed projects amount
    const done = projectTasks.filter((t) => t.status === "CONCLUIDO").length;

    // progress bar
    const progress = projectTasks.length > 0 ? Math.round((done / projectTasks.length) * 100) : 0;

    // status background
    const cfg = statusColor.get(project.status)!;

    // project icon
    const ICON = ProjectIcons.get(project.icon)!;
    
    return (
        <Link
            key={project.id}
            href={`/projects/${project.id}`}            
            className={`rounded-xl p-5 cursor-pointer transition-all group bg-(--card)
            border border-(--border) hover:border-(--primary)`} 
        >

            {/* HEADER */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 bg-(--muted)">
                        <ICON size={25} color={project.color.toLowerCase()} />
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-(--foreground)">
                            {project.name}
                        </h3>

                        <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ color: cfg.color, background: cfg.background }}
                        >
                            {project.status}
                        </span>
                    </div>
                </div>

                
            </div>

            <p className="text-xs leading-relaxed mb-4 line-clamp-2 text-(--muted-foreground)">
                {project.description}
            </p>

            {/* PROGRESS */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs texxt-(--muted-foreground)">
                        Progresso
                    </span>

                    <span className="text-xs font-medium text-(--foreground)">
                        {progress}%
                    </span>
                </div>

                <div className="w-full h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                    <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progress}%`, background: project.color }}
                    />
                </div>
            </div>

            {/* STATUS */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <CheckCircle2 size={13} style={{ color: "#10b981" }} />

                        <span className="text-xs text-(--muted-foreground)">
                            {done}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Clock size={13} color="var(--muted-foreground)" />

                        <span className="text-xs text-(--muted-foreground)">
                            {projectTasks.length - done}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Users size={13} style={{ color: "var(--muted-foreground)" }} />

                        <span className="text-xs text-(--muted-foreground)">
                            {project.members.length}
                        </span>
                    </div>
                </div>

                <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((m) => (
                        <Image 
                            key={m.user.id} 
                            src={m.user.image ?? ""} 
                            alt={m.user.name} 
                            width={24}
                            height={24}
                            className="rounded-full ring-2" style={{ WebkitRingColor: "var(--card)" } as any} 
                        />
                    ))}

                    {project.members.length > 3 && (
                        <div
                            className={`w-6 h-6 rounded-full ring-2 flex items-center justify-center text-xs font-medium
                            bg-(--muted) text-(--muted-foreground)`}
                        >
                            +{project.members.length - 3}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}