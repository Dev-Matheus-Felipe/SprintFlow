"use client"

import React, { Dispatch } from "react"
import { ViewUniqueTasktype } from "./taskPage"
import { priorityOptions } from "../modals/newTaskModal";
import { TaskStatus } from "@prisma/client";
import { Calendar, User, X } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: "Todo", label: "To Do", color: "#6b7280" },
  { value: "InProgress", label: "In Progress", color: "#6d6ef7" },
  { value: "InReview", label: "In Review", color: "#f59e0b" },
  { value: "Completed", label: "Completed", color: "#10b981" },
];

const inputStyle = `w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
bg-(--secondary) border border-(--border)`;

export default function ViewUniqueTask({
    viewTask,
    setViewTask,
} : {
    viewTask: ViewUniqueTasktype,
    setViewTask: Dispatch<React.SetStateAction<ViewUniqueTasktype>>,
}){

    const task = viewTask.task;
    if(!task) return null;

     // GENERAL DATA
    const currentPriority = priorityOptions.find((p) => p.label === task.priority);
    const currentStatus = statusOptions.find((s) => s.value === task.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)]">
            <div
                className={`w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden
                bg-(--card) border border-(--border)`}
            >
                {/* HEADER */}
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
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors 
                            text-(--muted-foreground) cursor-pointer`}
                            onClick={() => setViewTask({state: false, task: null})}

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

                        {/* MAIN CONTENT */}
                        <div className="flex-1 px-6 py-4 min-w-0">

                            <p className="text-sm leading-relaxed mb-6 text-(--muted-foreground)">
                                {task.description}
                            </p>

                            <div>

                                {/* STATUS */}
                                <div>
                                    <p className="text-xs font-medium mb-2 text-(--muted-foreground)">
                                        Status
                                    </p>

                                    <p
                                        className={`w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
                                        text-(--foreground) bg-(--secondary) border border-(--border)`}
                                    >
                                        {task.priority}
                                    </p>

                                </div>

                                {/* PRIORITY */}
                                <div>
                                    <p className="text-xs font-medium mt-4 mb-2 text-(--muted-foreground)">
                                        Priority
                                    </p>

                                    <div
                                        className={inputStyle}
                                        style={{ color: currentPriority?.color }}
                                    >

                                        {task.priority}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-medium mt-4 mb-2 text-(--muted-foreground)">
                                        Sprint
                                    </p>

                                    <div
                                        className={inputStyle}

                                    >

                                        <p className="truncate">{task.sprintId ? task.sprintId : "Undefined"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*SIDEBAR METADATA */}
                        <div className="lg:w-56 p-5 pt-3  shrink-0 space-y-5 border-l border-(--border)">

                            {/* ASSIGNEE */}
                            <div>
                                <div className="flex justify-between items-center relative">
                                    <p className="text-xs font-medium mb-2 flex items-center gap-1 text-(--muted-foreground)">
                                        <User size={11} />
                                        Person in charge
                                    </p>

                                </div>
                                

                                { task.user ? (
                                    <div className="flex items-center gap-2">
                                        <Image 
                                            src={task.user.image ?? ""}
                                            width={24}
                                            height={24} 
                                            alt={task.user.name} 
                                            className="w-6 h-6 rounded-full" 
                                        />

                                        <span className="text-xs text-(--foreground) truncate">
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

                            {/* DUE DATE */}
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

                            {/* POINTS */}
                            <div>
                                <p className="text-xs font-medium mb-2 text-(--muted-foreground)">
                                    Points
                                </p>

                                <span className="text-sm font-semibold text-(--foreground)">
                                    {task.points || "—"}
                                </span>
                            </div>

                            {/* DATES */}
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