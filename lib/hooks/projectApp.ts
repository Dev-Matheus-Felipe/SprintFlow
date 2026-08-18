"use client"

import { ProjectDataContext } from "@/components/providers/project/projectDataProvider";
import { RoleContext } from "@/components/providers/project/roleProvider";
import { useContext } from "react"
import { ProjectModalsContext } from "@/components/providers/project/projectModalsProvidert";

export default function useProjectApp(){
    const modal = useContext(ProjectModalsContext);
    const data = useContext(ProjectDataContext);
    const role = useContext(RoleContext);

    if(!data?.data || !role?.role || !modal){
        throw new Error("USE PROJECT APP ERROR");
    }

    return {
        projectData: data,
        role: role.role,
        modal,
    }
}