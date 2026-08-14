"use client"

import getAllProjectUsers from "@/lib/project/components/getAllProjectUsers";
import { Dispatch, useEffect, useState } from "react"
import Image from "next/image";

export type AllProjectUserType = {
    name: string,
    id: string,
    image: string
}

export default function SetUserTask({
    setUser,
    setOpenSelector,
    projectId,
} : {
    setUser: (id: AllProjectUserType) => void,
    setOpenSelector: Dispatch<React.SetStateAction<boolean>>,
    projectId: string
}){
    const [users, setUsers] = useState<AllProjectUserType[]>([]);

    useEffect(() => {
        async function load(){
            const res = await getAllProjectUsers({projectId});
            setUsers(res);
        }   
        
        load();
    },[])

    return (
        <div
            className={`w-full px-2.5 rounded-lg text-xs outline-none appearance-none
            bg-(--secondary) border border-(--border) cursor-pointer absolute top-7 max-h-50 overflow-auto`}
        >


            { users.map((p) => (
                <button 
                    onClick={() =>{ setUser(p); setOpenSelector(false); }}
                    className="flex justify-between items-center w-full my-2 hover:bg-(--muted) p-2 rounded cursor-pointer "
                    key={p.id} 
                    value={p.id}
                >
                    <p className="truncate w-[70%] text-start">{p.name}</p>

                    <Image 
                        className="rounded-full"
                        width={25}
                        height={25}
                        src={p.image ?? ""} 
                        alt={p.name}                        
                    />
                </button>
            )) }
        </div>
    )
}