import { ProjectInfoType } from "@/components/providers/projectProvider";
import useModal from "@/lib/hooks/newProject";
import { ProjectIcons } from "@/lib/project/data";
import { ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import { Dispatch } from "react";
import TaskSprintHeader from "../taskSprintHeader";

const filters = ["Most recent", "Deadline", "Priority"];


export default function TaskPageHeader({
    projectInfo,
    tasksLength,

    filterStatus,
    setFilterStatus,

    search,
    setSearch,
} : {
    projectInfo: ProjectInfoType,
    tasksLength: number,

    filterStatus: {open: boolean, text: string},
    setFilterStatus: Dispatch<React.SetStateAction<{open: boolean, text: string}>>,

    search: string,
    setSearch: Dispatch<React.SetStateAction<string>>,
}){

    return (
        <div className="px-6 py-4 shrink-0 border-b border-(--border)">
            <TaskSprintHeader type="Task" length={tasksLength} projectInfo={projectInfo} />

            <div className="flex items-center gap-3 my-5">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1 max-w-xs
                bg-(--secondary) border border-(--border)`}
                >
                    <Search size={13} color="var(--muted-foreground)"/>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar tarefas..."
                        className="bg-transparent outline-none text-sm flex-1 text-(--foreground)"
                    />
                    
                </div>

                <div className="relative flex flex-col">

                    <div 
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm cursor-pointer bg-(--secondary) 
                    border border-(--border) text-(--muted-foreground) relative w-30 justify-center`}
                    onClick={() => setFilterStatus(prev => ({...prev, open: !prev.open}))}
                    >
                    <p>{filterStatus.text}</p>

                    { !filterStatus.open ? <ChevronDown size={14} /> : <ChevronUp size={14} /> }
                    </div>

                    <div className={`bg-(--secondary) outline-none text-sm cursor-pointer text-(--foreground) flex-col absolute
                    ${filterStatus.open ? "flex" : "hidden"} whitespace-nowrap px-3 py-4 gap-5 w-30 z-5 rounded
                    top-10 left-1/2 -translate-x-1/2`}
                    >
                        {filters.map(f => (
                        <button 
                            key={f} 
                            className="cursor-pointer"
                            onClick={() => setFilterStatus({open: false, text: f})}
                        >
                            {f}
                        </button>
                        ))}
                    </div>  
                </div>
            </div>
        </div>
    )
}