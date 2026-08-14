import ModalsProvider from "@/components/providers/modalsProvider";
import SidebarProvider from "@/components/providers/sidebarProvider";
import { TitlePageProvider } from "@/components/providers/titlePageProvider";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarShell from "@/components/sidebar/sidebarShell";
import Topbar from "@/components/topbar/topbar";
import React from "react";
import TaskProvider from "@/components/providers/tasksProvider";

export default function LoggedLayout({
    children,
} : {
    children: React.ReactNode,
}){

    return (
        <TaskProvider>
            <ModalsProvider>
                <SidebarProvider>
                    <TitlePageProvider>
                            <div className="w-screen h-full flex relative">
                                <SidebarShell children={ <Sidebar /> } />

                                <div className="flex-1 flex flex-col min-w-0">
                                    <Topbar />
                                    <div className="p-7">{children}</div>
                                </div>
                            </div>
                    </TitlePageProvider>
                </SidebarProvider>
            </ModalsProvider>
        </TaskProvider>     
    )
}