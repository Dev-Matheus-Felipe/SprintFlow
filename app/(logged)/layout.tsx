import LayoutShell from "@/components/shells/layoutShell";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function LoggedLayout({children} : {children: React.ReactNode}){

    return (
        <LayoutShell sidebarContent={<Sidebar />}>
            {children}
        </LayoutShell>
    )
}