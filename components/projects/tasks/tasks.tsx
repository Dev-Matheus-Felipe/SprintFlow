"use client"

import { ProjectInfoType } from "@/components/providers/projectProvider";
import { usePageTitle } from "@/lib/hooks/pageTitle";
import { ProjectIcons } from "@/lib/project/data";
import { ProjectTaskPageType } from "@/lib/types";
import { Task } from "@prisma/client";
import { Calendar, ChevronDown, Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Tasks({
    tasks,
    projectInfo
} : { 
    tasks: Task[],
    projectInfo: ProjectInfoType
}){
    
    const[showFilters, setShowFilters] = useState<boolean>(false);
    const[statusFilter, setStatusFilter] = useState<string>("false");
    const[priorityFilter, setPriorityFilter] = useState<string>("false");

    const { setTitle } = usePageTitle();
    
    useEffect(() => {
        setTitle("Tasks");
    },[]);

    const ICON = ProjectIcons.get(projectInfo.icon)!;
    
    return (
        <div className="flex-1 flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-6 py-4 shrink-0 border-b border-(--border)">
                <div className="flex items-center gap-3 mb-3">
                    <ICON size={16} color="var(--muted-foreground)" />

                    <span className="text-sm text-(--muted-foreground)">
                        {projectInfo.name}
                    </span>

                    <span className="text-(--border)">/</span>

                    <span className="text-sm font-medium text-(--foreground)">
                        Tasks
                    </span>

                    <span className="text-xs px-2 py-0.5 rounded font-medium text-(--muted-foreground) bg-(--muted)">
                        {tasks.length}
                    </span>

                    <div className="flex-1" />

                    <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium 
                    transition-colors bg-(--primary) text-(--primary-foreground) cursor-pointer`}
                    >
                        <Plus size={14} />
                        New Task
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1 max-w-xs
                    bg-(--secondary) border border-(--border)`}
                    >
                        <Search size={13} color="var(--muted-foreground)"/>

                        <input
                            type="text"
                            placeholder="Buscar tarefas..."
                            className="bg-transparent outline-none text-sm flex-1 text-(--foreground)"
                        />
                        
                    </div>

                    <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors 
                    cursor-pointer border ${showFilters 
                        ? "bg-(--accent) text-(--primary) boder-(--primary)"
                        : "bg-(--secondary) text-(--muted-foreground) boder-(--border)"}`}
                   >
                        <Filter size={13} />
                        Filters
                    </button>

                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm cursor-pointer
                    bg-(--secondary) border border-(--border) text-(--muted-foreground)`}>
                        <ChevronDown size={13} />

                        <select className="bg-transparent outline-none text-sm cursor-pointer text-(--foreground)">
                            <option value="updated">Mais recente</option>
                            <option value="priority">Prioridade</option>
                            <option value="due">Prazo</option>
                        </select>
                    </div>
                </div>

            {showFilters && (
            <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex gap-1">
                <span className="text-xs py-1 px-1" style={{ color: "var(--muted-foreground)" }}>
                    Status:
                </span>
                {(["all", "backlog", "todo", "in_progress", "in_review", "done"] as const).map((s) => (
                    <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                    style={{
                        background: statusFilter === s ? "var(--accent)" : "transparent",
                        color: statusFilter === s ? "var(--primary)" : "var(--muted-foreground)",
                        border: `1px solid ${statusFilter === s ? "var(--primary)" : "transparent"}`,
                    }}
                    >
                    {s === "all" ? "Todos" : s}
                    </button>
                ))}
                </div>
                <div className="flex gap-1">
                <span className="text-xs py-1 px-1" style={{ color: "var(--muted-foreground)" }}>
                    Prioridade:
                </span>
                {(["all", "critical", "high", "medium", "low"] as const).map((p) => (
                    <button
                    key={p}
                    className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                    style={{
                        background: priorityFilter === p ? "var(--accent)" : "transparent",
                        color: priorityFilter === p ? "var(--primary)" : "var(--muted-foreground)",
                        border: `1px solid ${priorityFilter === p ? "var(--primary)" : "transparent"}`,
                    }}
                    >
                    {p === "all" ? "Todas" : p}
                    </button>
                ))}
                </div>
            </div>
            )}
        </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Tarefa", "Status", "Prioridade", "Responsável", "Prazo", "Pontos"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const sc = statusFilter;
              const pc = priorityFilter;
              const isOverdue = new Date(task.deadline) < new Date() && task.status !== "CONCLUIDO";

              return (
                <tr
                  key={task.id}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "var(--muted)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = "transparent";
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {task.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {sc}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                    >
                      {pc}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {/*task.assignee ? (
                      <div className="flex items-center gap-2">
                        <img src={task.assignee.avatar} alt={task.assignee.name} className="w-5 h-5 rounded-full" />
                        <span className="text-xs" style={{ color: "var(--foreground)" }}>
                          {task.assignee.name.split(" ")[0]}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        —
                      </span>
                    )*/}
                  </td>
                  <td className="px-4 py-3">
                   <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: isOverdue ? "#ef4444" : "var(--muted-foreground)" }}
                      >
                        <Calendar size={11} />
                        DATA HERE
                      </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
                    >
                      {task.userId || "—"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/*filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              Nenhuma tarefa encontrada
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Ajuste os filtros ou crie uma nova tarefa
            </p>
          </div>
        )*/ }
      </div>
    </div>
  );
}