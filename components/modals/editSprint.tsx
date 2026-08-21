"use client"

import useProjectApp from "@/lib/hooks/projectApp";
import editSprintServer from "@/lib/sprint/editSprint";
import { EditSprintSchema, EditSprintSchemaType } from "@/lib/zod/editSprint";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format } from "date-fns";
import { Calendar, ChevronRight, Pencil, Target, X } from "lucide-react";
import { useForm } from "react-hook-form";

export type sprintStatusType = "Planning" | "Delayed" | "Active" | "Completed";

const sprintStatusOptions: { value: sprintStatusType; color: string; description: string }[] = [
  { value: "Planning",  color: "#6d6ef7", description: "Sprint hasn't started yet." },
  { value: "Active",    color: "#10b981", description: "Sprint in progress." },
  { value: "Completed", color: "#6b7280", description: "Sprint completed." },
  { value: "Delayed",   color: "#eab308", description: "Sprint delayed" },
];

export default function EditSprintModal({close} : {close: () => void}){
    const { projectData } = useProjectApp();
    const { data } = projectData;

    const sprint = data.sprint;
    if(!sprint) return null;

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isSubmitting, disabled }

    } = useForm<EditSprintSchemaType>({
        resolver: zodResolver(EditSprintSchema),
        defaultValues: {
            ...sprint,
        }
    });

    if(!sprint) return null;

    const handleEditSprint = async(data: EditSprintSchemaType) => {
        const res = await editSprintServer({data, id: sprint.id});
        alert(res.message);
    }

    const situation: sprintStatusType = watch("situation");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.55)]">
            <form 
                onSubmit={handleSubmit(handleEditSprint)}
                className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-(--card) border border-(--border)">
                
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-(--border)">

                    <div className="flex items-center gap-2">
                        <Pencil size={14} color="var(--primary)"/>

                        <span className="text-sm font-semibold text-(--foreground)">
                            Edit Sprint
                        </span>

                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-(--accent) text-(--primary)">
                            {sprint.name}
                        </span>

                    </div>

                    <button
                        onClick={close}
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors text-(--foreground)
                        cursor-pointer`}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--muted)")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                    >

                        <X size={15} />
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-5 space-y-5 max-h-100 overflow-auto">

                    {/* GOAL */}
                    <div>
                        
                        <label
                            className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider mb-2
                            text-(--muted-foreground)`}
                        >
                            <Target size={11} />
                            Objective
                        </label>

                        <textarea
                            {...register("objective")}
                            autoFocus
                            placeholder="What is the goal of this sprint?"
                            rows={4}
                            className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none transition-colors
                            bg-(--secondary) border border-(--border) text-(--foreground)`}

                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />

                        {errors.objective && <p className="text-xs text-red-500 pt-2">{errors.objective.message}</p>}
                    </div>

                    {/* DEADLINE */}
                    <div>
                        <label
                            className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider mb-2
                            text-(--muted-foreground)`}
                        >
                            <Calendar size={11} />
                            Deadline
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-xs mb-1 text-(--muted-foreground)">
                                    Start
                                </p>

                                <div
                                    className={`px-3 py-2.5 rounded-lg text-sm bg-(--muted) border border-(--border)
                                    text-(--muted-foreground)`}
         
                                >
                                    { format(new Date(sprint.startAt), "dd/MM/yyyy") }
                                </div>
                            </div>

                            <div>
                                <p className="text-xs mb-1 text-(--muted-foreground)">
                                    End
                                </p>

                                <input
                                    {...register("endAt", {valueAsDate: true})}
                                    type="date"
                                    min={format(sprint.startAt, "yyyy-MM-dd")}
                                    className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer
                                    bg-(--secondary) border border-(--border) text-(--foreground)`}

                                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                                />  
                            </div>
                        </div>

                        <p className="text-xs mt-1.5 text-(--muted-foreground)">
                            {(() => {
                                const days = differenceInDays(new Date(sprint.endAt), new Date(sprint.startAt));
                                return days > 0
                                    ? `Duration: ${days} days${days !== 1 ? "s" : ""}`
                                    : "⚠️ Endline must be after the start";
                                })()}
                        </p>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label
                            className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider mb-2 
                            text-(--muted-foreground)`}
                        >
                            Situation
                        </label>

                        <div className="space-y-2">
                            { sprintStatusOptions.map((opt) => (
                            <button
                                onClick={() => setValue("situation", opt.value, {
                                    shouldDirty: true
                                })}
                                key={opt.value}
                                type="button"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                                style={{
                                    cursor: "pointer",
                                    background: situation === opt.value ? opt.color + "12" : "var(--secondary)",
                                    border: `1.5px solid ${situation === opt.value ? opt.color + "60" : "var(--border)"}`,
                                }}
                            >
                                    
                                {/* RADIO INDICATOR */}
                                <span
                                    className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center border-2 transition-all"
                                    style={{
                                        borderColor: situation === opt.value ? opt.color : "var(--border)",
                                        background: situation === opt.value ? opt.color : "transparent",
                                    }}
                                >
                                    { situation === opt.value && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    )}
                                </span>

                                <div className="flex-1 min-w-0">
                                    <p
                                        className="text-sm font-medium"
                                        style={{ color: status === opt.value ? opt.color : "var(--foreground)" }}
                                    >
                                        {opt.value}
                                    </p>

                                    <p className="text-xs mt-0.5 text-(--muted-foreground)">
                                        {opt.description}
                                    </p>
                                </div>

                                {situation === opt.value && (
                                    <ChevronRight size={14} style={{ color: opt.color, flexShrink: 0 }} />
                                )}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-(--border)">
                    <span className="text-xs text-(--muted-foreground)">
                        { isDirty ? "Unsaved changes" : "No changes"}
                    </span>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={close}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-(--secondary)
                            text-(--foreground) border border-(--border) cursor-pointer`}
  
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all bg-(--primary)
                            ${isDirty ? "cursor-pointer" : "cursor-not-allowed"}`}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}