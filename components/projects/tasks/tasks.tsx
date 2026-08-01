"use client"

import { ProjectInfoType } from "@/components/providers/projectProvider";
import { usePageTitle } from "@/lib/hooks/pageTitle";
import { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import TaskPageHeader from "./header";

const tableHeaders = ["Tasks", "Status", "Priority", "Responsible", "Deadline", "Points"];

export default function Tasks({
    tasks,
    projectInfo
} : { 
    tasks: Task[],
    projectInfo: ProjectInfoType
}){
    
    const[filterStatus, setFilterStatus] = useState<{open: boolean, text: string}>({open: false, text: "Most recent"});
    const[search, setSearch] = useState<string>("");

    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle("Tasks");
    },[]);

    
    return (
    	<div className="flex-1 flex flex-col">

            {/* Header */}
            <TaskPageHeader
				filterStatus={filterStatus} setFilterStatus={setFilterStatus}
				search={search} setSearch={setSearch}

				projectInfo={projectInfo}
				tasksLength={tasks.length}
			/>

      		{/* Table */}
			<div className="flex-1">
				<table className="w-full">
					<thead>
						<tr className="border-b border-(--border)" >
						{tableHeaders.map((h) => (
							<th
								key={h}
								className={`text-left px-4 py-3 text-xs font-medium uppercase tracking-wider 
								text-(--muted-foreground)`}
							>
								{h}
							</th>
						))}
						</tr>
					</thead>

					<tbody>
					{ /* tasks.map((task) => {
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
							{task.assignee ? (
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
							)}
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
					}) */}
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