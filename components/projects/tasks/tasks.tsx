"use client"

import { usePageTitle } from "@/lib/hooks/pageTitle";
import { useEffect, useState } from "react";
import { Calendar, Search } from "lucide-react";
import { TaskPageDataType } from "@/lib/types";
import Image from "next/image";
import { ProjectStatusColors } from "@/lib/project/data";
import { priorityOptions } from "@/components/modals/newTaskModal";
import sortTasks from "@/lib/task/sortTasks";
import TaskSprintHeader from "../taskSprintHeader";
import { projetInfoType } from "@/app/(logged)/projects/[url]/tasks/page";
import useProjectApp from "@/lib/hooks/projectApp";

export const tableHeaders = ["Tasks", "Status", "Priority", "Responsible", "Deadline", "Points"];
const filters = ["Most recent", "Deadline", "Priority"];

export default function Tasks({
    tasks,
	sprints,
    projectInfo,
} : { 
    tasks: TaskPageDataType[],
	sprints: {name: string, id: string}[]
    projectInfo: projetInfoType,
}){
	
	// HOOKS NEEDED
	const { projectData, modal, role } = useProjectApp();
	const { setTitle } = usePageTitle();
	
	// SEARCH METHODS
    const[filterStatus, setFilterStatus] = useState<{open: boolean, text: string}>({
		open: false, 
		text: "Most recent",
	});

    const[search, setSearch] = useState<string>("");

	// INICIALIZATE TASK PROVIDER
    useEffect(() => {

		projectData.setData({sprints: sprints, projectId: projectInfo.id});
        setTitle("Tasks");
    },[]);

	// FILTERED TASKS
    const filteredTasks = sortTasks({tasks, type: filterStatus.text})
		.filter(task => task.description.toLowerCase().includes(search.toLowerCase()));

    return (
    	<div className="flex-1 flex flex-col min-w-0">

            {/* HEADER */}
            <div className="px-6 py-4 shrink-0 border-b border-(--border)">
				<TaskSprintHeader 
					type="Task" 
					length={tasks.length} 
					projectInfo={projectInfo} 
					modal={modal}
					role={role}
				/>

				<div className="flex items-center gap-3 my-5 min-0 max-xs:mt-10 max-xs:flex-col">
					<div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1 max-w-xs min-w-0
					bg-(--secondary) border border-(--border) max-xs:w-full`}
					>
						<Search size={13} color="var(--muted-foreground)"/>

						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search tasks..."
							className="bg-transparent outline-none text-sm flex-1 text-(--foreground) min-w-0"
						/>
						
					</div>

					<div>
						<select
							value={filterStatus.text}
							onChange={(e) => setFilterStatus({ open: false, text: e.target.value })}
							className={`w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
							bg-(--secondary) border border-(--border) cursor-pointer`}
							>

							{ filters.map((p) => (
								<option 
									key={p} 
									value={p}
									onClick={() => setFilterStatus({open: false, text: p})}
									>
									{p}
								</option>
							)) }
						</select>     
					</div>  
				</div>
			</div>

      		{/* TABLE */}
			<div className="flex-1 overflow-x-auto min-w-0">
  				{ filteredTasks.length > 0 ? 
					<table className="w-full min-w-100">
						<thead>
							<tr className="border-b border-(--border)" >
							{ tableHeaders.map((h) => (
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
							// DATE MANAGEMENT
							const isOverdue = new Date(task.deadline) < new Date() && task.status !== "Completed";
							const date = task.deadline;
							
							// TASK PRIORITY AND STATUS
							const Pcolor = priorityOptions.filter(p => p.label == task.priority)[0];
							const Scolor = ProjectStatusColors.get(task.status)!;

							return (
								<tr
									key={task.id}
									onClick={() => {
										projectData.setData(prev => ({...prev, task: task}));
										modal.setComponent("viewTask");

									}}

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
										{ task.user ? (
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
											{task.points || "—"}
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