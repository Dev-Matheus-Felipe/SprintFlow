import SidebarProvider from "@/components/providers/sidebarProvider/sidebarProvider";
import Sidebar from "@/components/sidebar/sidebar";
import SidebarContainer from "@/components/sidebar/sidebarContainer";
import Topbar from "@/components/topbar/topbar";
import React from "react";

export default function LoggedLayout({children} : {children: React.ReactNode}){
    return (
        <SidebarProvider>
            <div className="w-full h-full flex relative">
                    <Sidebar>
                        <SidebarContainer />
                    </Sidebar>

                    <div className="flex-1 flex flex-col">
                        <Topbar />   

                        <div className="p-5">
                            {children}
                        </div>
                    </div>
            </div>
        </SidebarProvider>
    )
}