import { Zap } from "lucide-react";
import MainNavegation from "./navegation";
import SidebarProjects from "./projects/projects";
import SidebarUserInfo from "./userInfo";

export default function Sidebar(){
    return (
        <>
            {/* LOGO */}
            <div className="flex items-center gap-3 border-b border-(--border) p-5">
                <div className="bg-primary p-2 rounded">
                    <Zap size={16} color="#fff" fill="#fff" />
                </div>

                <h1 className="font-bold text-lg">SprintFlow</h1>
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col flex-1">

                    {/* MAIN NAVEGATION */}
                    <MainNavegation />

                    {/* PROJECTS NAVEGATION */}
                    <SidebarProjects />
                </div>
                
                {/* USER DATA */}
                <SidebarUserInfo />
            </div>
        </>
    )
}