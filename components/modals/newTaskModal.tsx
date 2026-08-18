"use client"

import { avaliablePoints, NewTaskSchema, NewTaskSchemaType } from "@/lib/zod/newTaskSchema";
import { Calendar, ChevronDown, ChevronUp, X, Zap } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import postNewTassk from "@/lib/task/postNewTask";
import CloseModal from "../buttons/closeModal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useProjectApp from "@/lib/hooks/projectApp";

type PriorityOptionsType = {
    label: "Critical" | "High" | "Medium" | "Low",
    bg: string,
    color: string,
    dot: string
}

// GENERAL STATUS
const taskStatus = ["Todo", "InProgress", "InReview", "Completed"] as const;

export const priorityOptions: PriorityOptionsType[] = [
    { label: "Critical", color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", dot: "🔴" },
    { label: "High", color: "#f97316", bg: "rgba(249, 115, 22, 0.15)", dot: "🟠" },
    { label: "Medium", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", dot: "🟡" },
    { label: "Low", color: "#6b7280", bg: "rgba(107, 114, 128, 0.15)", dot: "⚪" },
] as const;


export default function NewTaskModal({
    close,
} : {
    close: () => void
}){

    const { projectData } = useProjectApp();
    const { data } = projectData;

    const [ filterOpen, setFilterOpen ] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting, isValid }
    } = useForm({
        resolver: zodResolver(NewTaskSchema),
        defaultValues: {
            priority: "Medium",
            status: "Todo",
            points: "1",
            description: "",
            deadline: undefined,
        },
    });

    

    const priority = watch("priority");
    const deadline = watch("deadline");
    const points = watch("points");
    const sprint = watch("sprint");

    const currentPriority = priorityOptions.find((p) => p.label === priority)!;

    const submitTask = async(formData: NewTaskSchemaType) => {
        if(!data?.projectId) return;

        const res = await postNewTassk({data: formData, projectId: data.projectId});
        if(res.sucess){
            close();
        }

        alert(res.message);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">

            <div
                className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-(--card)
                border border-(--border) z-20`}
            >
                
                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 shrink-0 pb-0">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-(--accent)">
                            <Zap size={13} color="var(--primary)"  />
                        </div>

                        <h2 className="text-sm font-semibold text-(--foreground)">
                            New Task
                        </h2>

                    </div>

                    <CloseModal 
                        close={close}
                        style={`w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer
                        text-(--muted-foreground) hover:bg-(--muted)`}
                    >
                        <X size={15} />

                    </CloseModal>
                </div>

                {/* FORM */}
                <form className="flex-1 overflow-y-auto" onSubmit={handleSubmit(submitTask)}>
                    <div className="px-6 py-5 space-y-5">

                        <div className="h-px bg-(--border) "/>

                            {/* ROW 1 - STATUS + PRIORITY */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider 
                                    text-(--muted-foreground)`}>
                                        Status
                                    </label>

                                    <select
                                        {...register("status")}
                                        className={`w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none 
                                        bg-(--secondary) border border-(--border) text-(--foreground) cursor-pointer`}
                                        onFocus={(e) => (e.target.style.borderColor = "var(--primary)!")}
                                        onBlur={(e) => (e.target.style.borderColor = "var(--border)!")}
                                    >
                                        { taskStatus.map((s, index) => (
                                            <option 
                                                key={index} 
                                                value={s} 
                                                onClick={() => setValue("status", s)}
                                            >
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
                                        { priorityOptions.map((p) => (
                                            <button
                                                key={p.label}
                                                type="button"
                                                onClick={() => setValue("priority", p.label)}
                                                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all 
                                                cursor-pointer`}
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

                        {/* ROW 2 - DUE DATE + POINTS */}
                        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 ">
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
                                    {...register("deadline", {valueAsDate: true})}
                                    className={`w-full px-3 py-2 rounded-lg text-sm outline-none cursor-pointer bg-(--secondary)
                                        border border-(--border) ${deadline ? "text-(--foreground)" : "text-(--muted-foreground)"}
                                        scheme-light-dark`}

                                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-xs font-medium mb-1.5 uppercase tracking-wider text-(--muted-foreground)"
                                >
                                    Points
                                </label>

                                <div className="flex gap-1.5">
                                    {avaliablePoints.map((pt) => (
                                        <button
                                            key={pt}
                                            type="button"
                                            onClick={() => setValue("points", pt)}
                                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border
                                            cursor-pointer hover:border-(--primary) ${points === String(pt) 
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

                    {/* DESCRIPTION */}
                    <textarea
                        {...register("description")}
                        placeholder="Add a description.."
                        rows={3}
                        
                        className={`w-full text-sm outline-none bg-transparent resize-none text-(--muted-foreground) 
                        border-t p-3 border-(--border)`}
                    />

                    {/* FOOTER */}
                    <div className={`px-6 py-4 flex items-center justify-between shrink-0 border-t border-(--border)
                    max-sm:flex-col max-sm:gap-5 max-sm:items-start`}
                    >
                        <div className="relative flex flex-col min-h-0">
                            <div 
                                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm cursor-pointer border
                                border-(--border) text-(--muted-foreground) relative  
                                max-sm:w-full w-45 justify-center bg-(--secondary) `}
                                onClick={() => setFilterOpen(prev => !prev)}
                            >
                                <p>{sprint?.name ?? "No sprints conected"}</p>

                                { !filterOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} /> }
                            </div>

                            <div className={`bg-(--secondary) outline-none text-sm cursor-pointer text-(--foreground) 
                                ${filterOpen ? "flex" : "hidden"} whitespace-nowrap gap-5 max-sm:w-full w-45 z-5 rounded
                                bottom-full mb-3 left-1/2 -translate-x-1/2 absolute flex-col origin-bottom max-h-50
                                overflow-auto text-(--muted-foreground)`}
                            >
                                { data?.sprints.map(f => (
                                    <button 
                                        key={f.id} 
                                        type="button"
                                        className={`cursor-pointer text-xs border hover:border-(--primary) rounded-md  
                                        border-transparent px-3 py-2`}
                                        onClick={() =>{
                                            setValue("sprint", {name: f.name, id: f.id});
                                            setFilterOpen(false);
                                        } }
                                    >
                                        {f.name}
                                    </button>
                                ))}
                            </div>  
                        </div>

                        <div className="flex gap-2 max-sm:justify-between max-sm:w-full ">

                            <CloseModal 
                                close={close}
                                style={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-(--secondary) 
                                text-(--foreground) border border-(--border) cursor-pointer`}
                                children="Cancel"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                                ${ isValid 
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