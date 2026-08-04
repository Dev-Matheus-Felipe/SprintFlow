import { projectViewIcons, views } from "@/lib/project/data";
import { Plus } from "lucide-react";

export default function ProjectLoading(){
    return (
        <div className="flex-1">
            <div className="flex-1 min-h-61 bg-(--card) border border-(--border) rounded-xl mb-6" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Views
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {views.map((v) => {
                        const ViewIcon = projectViewIcons[v.icon];

                        return (
                            <div
                                key={v.label}
                                className={`rounded-xl p-4 text-left transition-all group bg-(--card) border border-(--border)
                                hover:bg-(--accent) hover:border-(--primary) cursor-pointer`} 
                            >
                                <div className="mb-3 text-(--primary)">
                                    <ViewIcon size={16} />
                                </div>

                                <p className="text-sm font-semibold text-(--foreground)">
                                    {v.label}
                                </p>

                                <p className="text-xs mt-0.5 text-(--muted-foreground)">
                                    {v.description}
                                </p>
                            </div>
                        )
                    })}

                    </div>

                    {/* Sprints */}
                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Sprints
                    </h3>
                    
                    <div className="space-y-2">
                        <p className="text-xs underline">No sprints created yet.</p>
                    </div>
                </div>

                {/* Members */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-(--foreground)">
                            Membros ...
                        </h3>

                        <div className="flex items-center gap-1 text-xs transition-colors text-(--primary) cursor-pointer">
                            <Plus size={12} />
                            Convidar
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-(--card) border border-(--border)">
                        <div className="flex items-center gap-3 px-4 py-10" />
                    </div>
                </div>
            </div>
        </div>
    )
}