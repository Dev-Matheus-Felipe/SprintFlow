"use client"

import { SidebarContext } from "@/components/providers/sidebarProvider"
import { useContext } from "react"

export default function useSidebar(){
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("useSidebar must be used within the sidebarProvider");

    return ctx;
}