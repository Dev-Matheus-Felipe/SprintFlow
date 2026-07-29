import SidebarProjects from "../projects/sidebar";
import MainNavegation from "./navegation";
import SidebarUserInfo from "./userInfo";
import { Zap } from "lucide-react";

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

            <div className="flex-1 min-h-0 flex flex-col justify-between">
                <div className="flex flex-col flex-1 min-h-0">

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