"use client"

import { PageProjectsType } from "@/lib/types"
import { Search } from "lucide-react";
import { useState } from "react"

type FilterType = "TODOS" | "ATIVO" | "EM_PAUSA" | "FINALIZADO" | "ABORTADO";

type AllFiltersType = {
    name: string,
    filter: FilterType
}

const AllFilters: AllFiltersType[] = [
    {name: "Todos", filter: "TODOS"},
    {name: "Ativo", filter: "ATIVO"},
    {name: "Em Pausa", filter: "EM_PAUSA"},
    {name: "Finalizado", filter: "FINALIZADO"},
    {name: "Abortado", filter: "ABORTADO"},
]

export default function Projects({projects} : {projects: PageProjectsType[]}){
    const [filter, setFilter] = useState<FilterType>("TODOS");
    const [search, setSearch] = useState<string>("");



    return (
        <div className="flex flex-col">
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
        </div>
    )
}