import NewProjectButton from "@/components/buttons/newProjectButton";
import Projects from "@/components/projects/projectsContainer";
import { auth } from "@/lib/auth"
import { getPageProjects } from "@/lib/project/getPageData";
import { PageProjectsType } from "@/lib/types";

export default async function ProjectsPage(){
    const session = await auth();
    if(!session?.user?.id) return null;
    
    const projects: PageProjectsType[] = await getPageProjects({id: session.user.id});

    return (
        <div className="h-full flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Projects</h1>
                    <p className="flex-sm text-(--muted-foreground)">
                        {projects.length > 0
                            ? projects.length + " total" + (projects.length > 1 ? "s" : "")
                            : "No projects added"
                        }
                    </p>
                </div>

                <NewProjectButton />
            </div>
            
            <Projects projects={projects} />
        </div>
    )
}