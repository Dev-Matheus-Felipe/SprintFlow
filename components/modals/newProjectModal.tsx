"Use client"

import { ProjectColors, ProjectIcons } from "@/lib/data/generalData"
import { LucideIcon, X } from "lucide-react"
import React, { Dispatch, useState } from "react"

export default function NewProjectModal({
    setOpen,
} : {
    setOpen: Dispatch<React.SetStateAction<boolean>>
}){

    const [color, setColor] = useState("");
    const [icon, setIcon] = useState<LucideIcon>();
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">
            <div
                className="w-full max-w-md rounded-2xl p-6 shadow-2xl bg-(--card) border border-(--border)"
            >
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

                <form  className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-(--foreground)">Project's name</label>
                        <input
                            autoFocus
                            placeholder="Ex: Mobile App v3"
                            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                            style={{
                                background: "var(--secondary)",
                                border: "1px solid var(--border)",
                                color: "var(--foreground)",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-(--foreground)">Description</label>

                        <textarea
                            placeholder="Describe the objective of the project here..."
                            rows={3}
                            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                            style={{
                                background: "var(--secondary)",
                                border: "1px solid var(--border)",
                                color: "var(--foreground)",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-(--foreground)">Cor of the project</label>

                        <div className="flex gap-2">
                            {ProjectColors.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c.toLowerCase())}
                                    className={`w-6 h-6 rounded-full transition-transform hover:scale-110 cursor-pointer`}
                                    style={{
                                        background: c,
                                        outline: color === c.toLocaleLowerCase() ? `2px solid ${c}` : "none",
                                        outlineOffset: "2px",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-(--foreground)">Ícone</label>

                        <div className="flex gap-2 flex-wrap">
                            {ProjectIcons.map((IC, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setIcon(IC)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all border 
                                    cursor-pointer ${icon == IC 
                                        ? "bg-(--accent) border-(--primary)" 
                                        : "bg-(--secondary) border-(--border)"}`}
     
                                    >
                                    <IC size={16} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                        >
                            Cancel
                        </button>
                        
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}