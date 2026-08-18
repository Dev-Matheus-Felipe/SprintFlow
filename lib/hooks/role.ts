"use client"

import { RoleContext } from "@/components/providers/project/roleProvider"
import { useContext } from "react"


export default function useRole(){
    const ctx = useContext(RoleContext);
    if(!ctx || !ctx.role) throw new Error("ERROR");

    return {role: ctx.role};
}