"use client"

import { AllFilters } from "@/lib/project/data";
import { AllProjectsType } from "@/lib/types"
import { Search } from "lucide-react";
import { useState } from "react"
import ProjectComponent from "./projectComponent";

type FilterType = "TODOS" | "ATIVO" | "EM_PAUSA" | "FINALIZADO" | "ABORTADO";

export type AllFiltersType = {
    name: string,
    filter: FilterType
}

export default function Projects({projects} : {projects: AllProjectsType[]}){
    const [filter, setFilter] = useState<FilterType>("TODOS");
    const [search, setSearch] = useState<string>("");

    const filteredProjects = projects
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (filter === "TODOS" || p.status === filter));

    return (
        <div className="flex flex-col gap-5">

            {/* SEARCH SYSTEM */}
            <div className="flex flex-col lg:flex-row items-center gap-5">
                <div className="flex gap-3 items-center bg-(--secondary) h-10 px-2 pl-3 py-3 rounded w-70 max-lg:w-full">
                    <Search size={16} />

                    <input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-0 text-sm px-1 flex-1"
                        placeholder="Search..."
                    />
                </div>

                <div className={`bg-(--secondary) flex gap-3 items-center p-2 rounded h-10 max-sm:flex-wrap max-sm:h-auto
                justify-around max-lg:w-full`}>
                    { AllFilters.map(({name, filter: f}) => (
                        <button 
                            key={name}
                            onClick={() => setFilter(f)}
                            className={`cursor-pointer text-sm py-1 px-2 rounded ${filter == f && "bg-(--card)"} text-sm`}
                        >
                            {name}
                        </button>
                    )) }
                </div>
            </div>

            {/* FILTERED PROJECTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProjects.length > 0
                    ? filteredProjects
                        .map((project) => (
                            <ProjectComponent project={project} key={project.id} />
                        ))

                    :
                        <div className="col-span-full flex flex-col items-center justify-center py-16">
                            <div className="text-4xl mb-3">🔍</div>

                            <p className="text-sm font-medium text-(--foreground)">
                                No projects found
                            </p>

                            <p className="text-xs mt-1 text-(--muted-foreground)">
                                Try adjusting  the filters or creating a new project
                            </p>
                        </div>
                }
            </div>
        </div>
    )
}