"use client"

import { useState } from "react";
import Sidebar from "@/components/sidebar/sidebarShell";
import Topbar from "@/components/topbar/topbar";
import React from "react";

export default function LayoutShell({
    children,
    sidebarContent,
} : {
    children: React.ReactNode,
    sidebarContent: React.ReactNode,
}){
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-full flex relative">
            <Sidebar open={open}>
                {sidebarContent}
            </Sidebar>

            <div className="flex-1 flex flex-col">
                <Topbar setOpen={setOpen} />
                <div className="p-5">{children}</div>
            </div>
        </div>
    )
}