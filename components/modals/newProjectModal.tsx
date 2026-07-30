"Use client"

import postNewProject from "@/lib/project/components/postNewProject";
import { ProjectColors, ProjectIconNames, ProjectIcons } from "@/lib/project/data";
import { newProjectSchema, newProjectSchemType } from "@/lib/zod/newProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react"
import { useForm } from "react-hook-form";

const inputStyle = `w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none bg-(--secondary)
border border-(--border) text-(--foreground)`;

export default function NewProjectModal({
    setOpen,
} : {
    setOpen: (open: boolean) => void
}){

    const {
        register,
        watch,
        formState: {errors, },
        handleSubmit,
        setValue
    } = useForm<newProjectSchemType>({resolver: zodResolver(newProjectSchema)});

    const createProject = async(data: newProjectSchemType) => {
        const res = await postNewProject({data});

        alert(res.message);

        if(res.sucess){
            setOpen(false);
        }
        
    }

    const color = watch("color");
    const icon = watch("icon");
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">
            <div
                className="w-full max-w-md rounded-2xl p-6 shadow-2xl bg-(--card) border border-(--border)"
            >
                {/* TITLE */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-(--foreground)">
                        New Project
                    </h2>

                    <button 
                        className="text-(--muted-foreground) cursor-pointer hover:text-primary hover:bg-(--secondary) rounded p-1" 
                        onClick={() => setOpen(false)}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* FORM */}
                <form  className="space-y-4" onSubmit={handleSubmit(createProject)}>

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-(--foreground)">Project's name</label>
                        <input
                            autoFocus
                            placeholder="Ex: Mobile App v3"
                            className={inputStyle}
                            {...register("name")}
                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />

                        {errors.name && <p className="text-xs text-red-500 pt-2">{errors.name.message}</p>}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-(--foreground)">Description</label>

                        <textarea
                            placeholder="Describe the objectives of the project here..."
                            rows={3}
                            {...register("description")}
                            className={inputStyle + `resize-none`}
                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />

                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>

                    {/* COLORS */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-(--foreground)">Cor of the project</label>

                        <div className="flex gap-2">
                            {ProjectColors.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setValue("color", c) }
                                    className={`w-6 h-6 rounded-full transition-transform hover:scale-110 cursor-pointer`}
                                    style={{
                                        background: c,
                                        outline: color === c ? `2px solid ${c}` : "none",
                                        outlineOffset: "2px",
                                    }}
                                />
                            ))}
                        </div>

                        {errors.color && <p className="text-xs text-red-500 pt-2">{errors.color.message}</p>}
                    </div>
                        
                    {/* ICONS */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-(--foreground)">Ícone</label>

                        <div className="flex gap-2 flex-wrap">
                            {ProjectIconNames.map((name, index) => {
                                const IC = ProjectIcons.get(name)!;

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setValue("icon", name)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all border 
                                        cursor-pointer ${icon == name 
                                            ? "bg-(--accent) border-(--primary)" 
                                            : "bg-(--secondary) border-(--border)"}`}
        
                                        >

                                        <IC size={16} color={`${icon == name 
                                            ? `${color || "var(--muted-foreground)"}` 
                                            : "var(--muted-foreground)"}`} 
                                        />
                                    </button>
                                )
                            })}
                        </div>

                        {errors.icon && <p className="text-xs text-red-500 pt-2">{errors.icon.message}</p>}
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
                            bg-(--secondary) text-(foreground) border border-(--border) hover:border-(--primary)`}
                        >
                            Cancel
                        </button>
                        
                        <button
                            type="submit"
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-(--primary)
                            text-(--primary-foreground) cursor-pointer`}
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}