import NewProjectProvider from "@/components/providers/newProjectProvider";
import SidebarProvider from "@/components/providers/sidebarProvider";
import { TitlePageProvider } from "@/components/providers/titlePageProvider";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarShell from "@/components/sidebar/sidebarShell";
import Topbar from "@/components/topbar/topbar";
import React from "react";

export default function LoggedLayout({
    children,
} : {
    children: React.ReactNode,
}){

    return (
        <NewProjectProvider>
            <SidebarProvider>
                <TitlePageProvider>
                    <div className="w-full h-full flex relative">
                        <SidebarShell children={ <Sidebar /> } />

                        <div className="flex-1 flex flex-col">
                            <Topbar />
                            <div className="py-7 px-9 overflow-y-auto">{children}</div>
                        </div>
                    </div>
                </TitlePageProvider>
            </SidebarProvider>
        </NewProjectProvider>
    )
}