import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ProjectsNavegation from "./projectsNavegation";

export default async function SidebarProjects() {
    const session = await auth();
    if(!session?.user?.id) return null;

    const projects = await prisma.project.findMany({
        where: {
            members: {
                some: {
                    userId: session.user.id,
                },
            },
        },
    });

    return (
        <ProjectsNavegation projects={projects} />
    );
}