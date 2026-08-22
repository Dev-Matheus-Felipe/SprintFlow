"use client"

import useProjectApp from "@/lib/hooks/projectApp";
import { useEffect } from "react";

export default function SetProjectSprints({
    sprints, 
    projectId,
} : {
    sprints: {name: string, id: string}[],
    projectId: string,
}){
    const { projectData } = useProjectApp();
    
    useEffect(() => {
        projectData.setData({sprints, projectId});
    },[]);

    return null;
}