import { auth } from "@/lib/auth"
import ProjectsNavegation from "./sidebarNavegation";
import { getSidebarProjects } from "@/lib/project/getSidebarData";

export default async function SidebarProjects() {
    const session = await auth();
    if(!session?.user?.id) return null;

    const projects = await getSidebarProjects({id: session.user.id});

    return (
        <ProjectsNavegation projects={projects} />
    );
}