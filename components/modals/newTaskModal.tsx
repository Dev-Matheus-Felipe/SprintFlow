"use client"

import { Calendar, X, Zap } from "lucide-react";
import { useForm } from "react-hook-form";

const taskStatus = ["Todo", "InProgress", "InReview", "Completed"];

const priorityOptions: { label: string; color: string; dot: string }[] = [
  { label: "Critical", color: "#ef4444", dot: "🔴" },
  { label: "High", color: "#f97316", dot: "🟠" },
  { label: "Medium", color: "#f59e0b", dot: "🟡" },
  { label: "Low", color: "#6b7280", dot: "⚪" },
];

export default function NewTaskModal({
    setOpen,
} : {
    setOpen: (open: boolean) => void
}){

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            priority: "Medium",
            status: "To do",
            points: "",
            date: "",
            description: "",
        },
    });
    
    const projectStatus = watch("status");
    const storyPoints = watch("points");
    const priority = watch("priority");
    const dueDate = watch("date");
    
    const currentPriority = priorityOptions.find((p) => p.label === priority)!;
    const submitTask = (data: any) => {

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">

            <div
                className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-(--card)
                border border-(--border) z-20`}
            >
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 shrink-0 pb-0">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-(--accent)">
                            <Zap size={13} color="var(--primary)"  />
                        </div>

                        <h2 className="text-sm font-semibold text-(--foreground)">
                            New Task
                        </h2>

                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer
                        text-(--muted-foreground) hover:bg-(--muted)`}
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Form */}
                <form className="flex-1 overflow-y-auto" onSubmit={handleSubmit(submitTask)}>
                    <div className="px-6 py-5 space-y-5">

                        <div className="h-px bg-(--border) "/>

                            {/* Row 1 — Status + Priority */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider 
                                    text-(--muted-foreground)`}>
                                        Status
                                    </label>

                                    <select
                                        className={`w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none 
                                        bg-(--secondary) border border-(--border) text-(--foreground) cursor-pointer`}
                                        onFocus={(e) => (e.target.style.borderColor = "var(--primary)!")}
                                        onBlur={(e) => (e.target.style.borderColor = "var(--border)!")}
                                    >
                                        { taskStatus.map((s, index) => (
                                            <option key={index} value={s} onClick={() => setValue("status", s)}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider 
                                    text-(--muted-foreground)`}>
                                        Priority
                                    </label>

                                    <div className="flex gap-1.5">
                                        {priorityOptions.map((p) => (
                                            <button
                                            key={p.label}
                                            type="button"
                                            onClick={() => setValue("priority", p.label)}
                                            className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                                            style={{
                                                    background: priority === p.label ? p.color + "20" : "var(--secondary)",
                                                    color: priority === p.label ? p.color : "var(--muted-foreground)",
                                                    border: `1px solid ${priority === p.label ? p.color + "50" : "var(--border)"}`,
                                                    fontWeight: priority === p.label ? 600 : 400,
                                                }}
                                                >
                                                {p.dot}
                                            </button>
                                        ))}
                                    </div>

                                    <p className="text-xs mt-1 text-center" style={{ color: currentPriority.color }}>
                                        {currentPriority.label}
                                    </p>
                                </div>
                        </div>

                        {/* Row 2 — Due date + Story Points */}
                        <div className="grid grid-cols-2 gap-4 ">
                            <div>
                                <label
                                    className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-(--muted-foreground)"
                                >
                                    <span className="flex items-center gap-1">
                                        <Calendar size={11} />
                                        Deadline
                                    </span>
                                </label>

                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setValue("date", e.target.value)}
                                    className={`w-full px-3 py-2 rounded-lg text-sm outline-none cursor-pointer bg-(--secondary)
                                        border border-(--border) ${dueDate ? "text-(--foreground)" : "text-(--muted-foreground)"}
                                        scheme-light-dark`}

                                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-(--muted-foreground)"
                                >
                                    Story Points
                                </label>

                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 5, 8, 13, 21].map((pt) => (
                                        <button
                                            key={pt}
                                            type="button"
                                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border
                                                ${storyPoints === String(pt) 
                                                ? "text-(--primary) border-(--primary) font-semibold bg-(--accent)" 
                                                : "text-(--muted-foreground) border-(--border) font-normal bg-(--secondary)"}`}
                                        >
                                            {pt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <textarea
                        {...register("description")}
                        placeholder="Add a description.."
                        rows={3}
                        
                        className={`w-full text-sm outline-none bg-transparent resize-none text-(--muted-foreground) 
                        border-t p-3 border-(--border)`}
                    />

                    {/* Footer */}
                    <div className="px-6 py-4 flex items-center justify-between shrink-0 border-t border-(--border)">
                        <div className="text-xs text-(--muted-foreground)">
                            {storyPoints && (
                                <span className="px-2 py-0.5 rounded font-medium mr-2 bg-(--accent) text-(--primary)">
                                    {storyPoints} pts
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-(--secondary) 
                                text-(--foreground) border border-(--border)`}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={!getValues("description").trim()}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                                ${getValues("description").trim() 
                                    ? "bg-(--primary) text-(--primary-foreground) cursor-pointer" 
                                    : "bg-(--muted) text-(--muted-foreground) cursor-not-allowed"}`}
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}