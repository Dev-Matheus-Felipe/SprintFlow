"use client"

import { ProjectInfoType } from "@/components/providers/projectProvider";
import { usePageTitle } from "@/lib/hooks/pageTitle";
import { useEffect, useState } from "react";
import TaskPageHeader from "./header";
import useProjectData from "@/lib/hooks/projectProps";
import { Calendar } from "lucide-react";
import { TaskPageDataType } from "@/lib/types";
import Image from "next/image";
import { ProjectStatusColors } from "@/lib/project/data";
import { priorityOptions } from "@/components/modals/newTaskModal";
import useModal from "@/lib/hooks/newProject";
import sortTasks from "@/lib/task/sortTasks";

export const tableHeaders = ["Tasks", "Status", "Priority", "Responsible", "Deadline", "Points"];

export default function Tasks({
    tasks,
	sprints,
    projectInfo,
} : { 
    tasks: TaskPageDataType[],
	sprints: { name: string, id: string }[]
    projectInfo: ProjectInfoType,
}){
    
    const[filterStatus, setFilterStatus] = useState<{open: boolean, text: string}>({
		open: false, 
		text: "Most recent",
	});

    const[search, setSearch] = useState<string>("");

	const { data, setData } = useProjectData();
    const { setTitle } = usePageTitle();
	const { setStatus } = useModal();

    useEffect(() => {
		if(data == null) setData({sprints: sprints, tasks: tasks, projectInfo});
        setTitle("Tasks");
    },[]);

    const filteredTasks = sortTasks({tasks, type: filterStatus.text})
		.filter(task => task.description.toLowerCase().includes(search.toLowerCase()));

    return (
    	<div className="flex-1 flex flex-col min-w-0">

            {/* Header */}
            <TaskPageHeader
				filterStatus={filterStatus} setFilterStatus={setFilterStatus}
				search={search} setSearch={setSearch}

				projectInfo={projectInfo}
				tasksLength={tasks.length}
			/>

      		{/* Table */}
			<div className="flex-1 overflow-x-auto min-w-0">
  				{ filteredTasks.length > 0 ? 
					<table className="w-full min-w-100">
						<thead>
							<tr className="border-b border-(--border)" >
							{tableHeaders.map((h) => (
								<th
									key={h}
									className={`text-left px-4 py-3 text-xs font-medium uppercase tracking-wider 
									text-(--muted-foreground) ${h == "Points" && "max-md:hidden"}`}
								>
									{h}
								</th>
							))}
							</tr>
						</thead>

						<tbody>
						{ filteredTasks.map((task) => {
							const isOverdue = new Date(task.deadline) < new Date() && task.status !== "Completed";
							const date = task.deadline;

							const Pcolor = priorityOptions.filter(p => p.label == task.priority)[0];
							const Scolor = ProjectStatusColors.get(task.status)!;

							return (
								<tr
									key={task.id}
									onClick={() => {
										setData(prev => {
											return (!prev) ? null : {...prev, taskOverviewId: task.id};

										});
										
										setStatus({open: true, component: "taskOverview"});
									} }
									className="cursor-pointer transition-colors border-b border-(--border)"
									onMouseEnter={(e) => {
										(e.currentTarget as HTMLTableRowElement).style.background = "var(--muted)"; }}

									onMouseLeave={(e) => {
										(e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
								>
									<td className="px-4 py-3 min-w-40">
										<div className="flex flex-col gap-1">
											<span className="text-sm font-medium text-(--foreground)">
												{task.description}
											</span>
										</div>
									</td>

									<td className="px-3  py-3">
										<span 
											className={`py-1 rounded-full text-xs font-medium px-2`}
											style={{color: Scolor.color, background: Scolor.bg }}
										>
											{task.status}
										</span>
									</td>

									<td className="px-4 py-3">
										<span 
											className={`px-2 py-1 rounded-full text-xs font-medium`}
											style={{color: Pcolor.color, background: Pcolor.bg }}
										>
											{task.priority}
										</span>
									</td>

									<td className="px-4 py-3">
										{task.user ? (
											<div className="flex items-center gap-2">
												<Image 
													src={task.user.image ?? ""} 
													alt={"User Icon"} 
													width={20}
													height={20}
													className="w-5 h-5 rounded-full" 
												/>

												<span className="text-xs text-(--foreground)">
													{task.user.name.split(" ")[0]}
												</span>
											</div>
										) : (
										<span className="text-xs text-(--muted-foreground)">
											—
										</span>
										)}
									</td>
									<td className="px-4 py-3">
										<span
											className={`flex items-center gap-1 text-xs
											${isOverdue ? "text-red-500" : "text-(--muted-foreground)"}`}
										>
												<Calendar size={11} />
												{ date.toLocaleDateString("pt-BR") }
											</span>
									</td>

									<td className="px-4 py-3">
										<span className="text-xs font-medium text-(--muted-foreground)">
											{task.userId || "—"}
										</span>
									</td>
								</tr>
							);
						}) }
						</tbody>
					</table>

					: <div className="flex flex-col items-center justify-center py-16">
						<div className="text-4xl mb-3">📋</div>

						<p className="text-sm font-medium text-(--foreground)">
							No tasks found
						</p>

						<p className="text-xs mt-1 text-(--muted-foreground)">
							Adjust the filters or create a new task
						</p>
					</div>
				}
      		</div>
		</div>
	);
}