"use client"

import useProjectData from "@/lib/hooks/projectProps";
import { TaskStatus } from "@prisma/client";
import { format } from "date-fns";
import { Calendar, Trash2, User, X } from "lucide-react";
import Image from "next/image";
import { priorityOptions } from "./newTaskModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTaskSchema, EditTaskSchemaType } from "@/lib/zod/editTask";
import EditTaskFunc from "@/lib/task/editTask";
import DeleteTaskFunc from "@/lib/task/deleteTask";
import { useEffect, useState } from "react";
import getAllSprints from "@/lib/sprint/getAllSprints";


const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: "Todo", label: "To Do", color: "#6b7280" },
  { value: "InProgress", label: "In Progress", color: "#6d6ef7" },
  { value: "InReview", label: "In Review", color: "#f59e0b" },
  { value: "Completed", label: "Completed", color: "#10b981" },
];


export default function ViewProjectTaskModal({setOpen} : {setOpen: (open: boolean) => void}){
    const [sprints, setSprints] = useState<{name: string, id: string}[]>([]);
    const { data } = useProjectData();

    const task = data?.tasks.find(task => task.id == data.taskOverviewId);

    const {
        register,
        formState: {isDirty},
        handleSubmit,
        watch,

    } = useForm({
        defaultValues: {
            status: task?.status ?? "Todo",
            priority: task?.priority ?? "Low",
            sprintId: task?.sprintId ?? ""
        },

        resolver: zodResolver(EditTaskSchema)
    });

    const priority = watch("priority");

    useEffect(() => {
        async function load(){
            const sprints = await getAllSprints({id: data?.projectInfo.id ?? ""});
            setSprints(sprints);
        }

        load();
    }, []);
    

    if(!data || !task){
        return null;
    }

    const editTaskhandler = async(data: EditTaskSchemaType) => {
        const res = await EditTaskFunc({data, id: task.id});
        
        alert(res.message);
    }

    const deleteTask = async() => {
        const res = await DeleteTaskFunc({id: task.id});
        alert(res.message);

        if(res.sucess){
            setOpen(false);
        }
    }

    const currentPriority = priorityOptions.find((p) => p.label === priority);
    const currentStatus = statusOptions.find((s) => s.value === task.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)]">
            <div
                className={`w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden
                bg-(--card) border border-(--border)`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-(--border)">
                    <div className="flex items-center gap-2  flex-1 min-w-0">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded bg-(--muted) text-(--muted-foreground)
                       truncate min-w-0`}>
                            #{task.id.toUpperCase()}
                        </span>

                        <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                            style={{ color: currentStatus?.color, background: (currentStatus?.color || "#000") + "15" }}
                        >
                            {currentStatus?.label}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => deleteTask()}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors 
                            text-(--muted-foreground) cursor-pointer`}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
                                (e.currentTarget as HTMLButtonElement).style.background = "#ef444415";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
                                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            }}
                        >
                            <Trash2 size={14} />
                        </button>

                        <button
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors 
                            text-(--muted-foreground) cursor-pointer`}
                            onClick={() => setOpen(false)}

                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "var(--muted)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col lg:flex-row">

                        {/* Main content */}
                        <div className="flex-1 px-6 py-4 min-w-0">

                            <p className="text-sm leading-relaxed mb-6 text-(--muted-foreground)">
                                {task.description}
                            </p>

                            <form onSubmit={handleSubmit(editTaskhandler)}>

                                {/* Status */}
                                <div>
                                    <p className="text-xs font-medium mb-2 text-(--muted-foreground)">
                                        Status
                                    </p>

                                    <select
                                        {...register("status")}
                                        className={`w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
                                        text-(--foreground) bg-(--secondary) border border-(--border) cursor-pointer`}
                                    >
                                        { statusOptions.map((s) => (
                                            <option key={s.value} value={s.value}>
                                                {s.label}
                                            </option>
                                        )) }
                                    </select>

                                </div>

                                {/* Priority */}
                                <div>
                                    <p className="text-xs font-medium mt-4 mb-2 text-(--muted-foreground)">
                                        Priority
                                    </p>

                                    <select
                                        {...register("priority")}
                                        className={`w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
                                        bg-(--secondary) border border-(--border) cursor-pointer`}
                                        style={{ color: currentPriority?.color }}
                                    >

                                        { priorityOptions.map((p) => (
                                            <option 
                                                key={p.label} 
                                                value={p.label}
                                                style={{color: p.color}}
                                            >
                                                {p.label}
                                            </option>
                                        )) }
                                    </select>
                                </div>

                                {/* Sprint */}
                                <div>
                                    <p className="text-xs font-medium mt-4 mb-2 text-(--muted-foreground)">
                                        Sprint
                                    </p>

                                    <select
                                        {...register("sprintId")}
                                        className={`w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
                                        bg-(--secondary) border border-(--border) cursor-pointer`}
                                    >

                                        { !task.sprintId &&
                                            <option value="">
                                                Undefined
                                            </option>
                                        }

                                        { sprints.map((p) => (
                                            <option 
                                                key={p.id} 
                                                value={p.id}
                                            >
                                                {p.name}
                                            </option>
                                        )) }
                                    </select>
                                </div>

                                { isDirty && 
                                    <button 
                                        type="submit"
                                        className="bg-(--primary)  px-4 py-1 rounded-md mt-4 text-sm cursor-pointer" 
                                    >
                                        Confirm
                                    </button>
                                }
                            </form>
                        </div>

                        {/* Sidebar metadata */}
                        <div className="lg:w-56 p-5 shrink-0 space-y-5 border-l border-(--border)">

                            {/* Assignee */}
                            <div>
                                <p className="text-xs font-medium mb-2 flex items-center gap-1 text-(--muted-foreground)">
                                    <User size={11} />
                                    Person in charge
                                </p>

                                { task.user ? (
                                    <div className="flex items-center gap-2">
                                        <Image 
                                            src={task.user.image ?? ""}
                                            width={24}
                                            height={24} 
                                            alt={task.user.name} 
                                            className="w-6 h-6 rounded-full" 
                                        />

                                        <span className="text-xs text-(--foreground)">
                                            {task.user.name}
                                        </span>
                                    </div>

                                ) : (
                                    <button
                                        className="text-xs text-(--muted-foreground)"
                                    >
                                        Unassigned
                                    </button>
                                )}
                            </div>

                            {/* Due date */}
                            <div>
                                <p className="text-xs font-medium mb-2 flex items-center gap-1 text-(--muted-foreground)">
                                    <Calendar size={11} />
                                    Deadline
                                </p>

                                <span
                                    className="text-xs"
                                    style={{
                                        color:
                                            new Date(task.deadline) < new Date() && task.status !== "Completed"
                                            ? "#ef4444"
                                            : "var(--foreground)",
                                    }}
                                >
                                    { format(new Date(task.deadline), "dd/MM/yyyy") }
                                </span>
                            </div>

                            {/* Story points */}
                            <div>
                                <p className="text-xs font-medium mb-2 text-(--muted-foreground)">
                                    Points
                                </p>

                                <span className="text-sm font-semibold text-(--foreground)">
                                    {task.points || "—"}
                                </span>
                            </div>

                            {/* Dates */}
                            <div className="pt-3 border-t border-(--border)">
                                <p className="text-xs text-(--muted-foreground)">
                                    Created at { format(new Date(task.createdAt), "dd/MM/yyyy") }
                                </p>

                                <p className="text-xs mt-0.5 text-(--muted-foreground)">
                                    Updated {format(new Date(task.updatedAt), "dd/MM")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}