import { statusColors, statusLabels } from "@/lib/project/data";
import { Sprint } from "@prisma/client";

export default function SprintComponent({
    sprint,
    tasksLength,
    sprintDone,
} : {
    sprint: Sprint,
    tasksLength: number,
    sprintDone: number,
}){

    const pct = tasksLength > 0 ? Math.round((sprintDone / tasksLength) * 100) : 0;

    return (
        <div
            className={`flex items-center gap-4 px-4 py-3 rounded-xl bg-(--card) border 
            border-(--border)`}>
                
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">

                    <span className="text-sm font-medium text-(--foreground)">
                        {sprint.name}
                    </span>

                    <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                            color: statusColors[sprint.situation],
                            background: statusColors[sprint.situation] + "15",
                        }}
                    >
                        {statusLabels[sprint.situation]}
                    </span>
                </div>

                <div className="w-full h-1 rounded-full bg-(--muted)">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: `${pct}%`,
                            background: statusColors[sprint.situation],
                        }}
                    />
                </div>
            </div>

            <div className="text-right shrink-0">
                <p className="text-xs font-medium text-(--foreground)">
                    {sprintDone}/{tasksLength}
                </p>

                <p className="text-xs text-(--muted-foreground)">tasks</p>
            </div>
        </div>
    )
}