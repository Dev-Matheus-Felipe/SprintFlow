import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function LoggedLayout({children} : {children: React.ReactNode}){
    return (
        <div className="w-full h-full flex relative">
            <Sidebar />

            <div className="flex-1 p-5">
                {children}
            </div>
        </div>
    )
}