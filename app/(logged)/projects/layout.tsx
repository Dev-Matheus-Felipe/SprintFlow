import ProjectProvider from "@/components/providers/projectProvider";
import React from "react";

export default function ProjectsLayout({children} : {children: React.ReactNode}){
    return (
        <ProjectProvider>
            {children}
        </ProjectProvider>
    )
}