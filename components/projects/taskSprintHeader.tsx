import { ProjectIcons } from "@/lib/project/data";
import { ProjectInfoType } from "../providers/projectProvider";
import { Plus } from "lucide-react";
import useModal from "@/lib/hooks/newProject";

export default function TaskSprintHeader({
    projectInfo,
    length,
    type,
} : {
    projectInfo: ProjectInfoType,
    length: number,
    type: "Task" | "Sprint"
}){

    const { setStatus } = useModal();
    const ICON = ProjectIcons.get(projectInfo.icon)!;

    return (
        <div className="flex items-center gap-3 mb-3">
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

            <div className="flex-1" />

            <button 
                onClick={() => setStatus({component: (type == "Task" ? "newTask" : "newSprint"), open: true})}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium 
                transition-colors bg-(--primary) text-(--primary-foreground) cursor-pointer`}
            >
                <Plus size={14} />
                New {type}
            </button>
        </div>
    )
}