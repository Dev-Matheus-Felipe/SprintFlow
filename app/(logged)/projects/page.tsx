import NewProjectButton from "@/components/buttons/project/newProjectButton";
import ProjectsList from "@/components/projects/projectsList";
import { auth } from "@/lib/auth"
import { getAllProjects } from "@/lib/project/pages/getAllProjects";
import { AllProjectsType } from "@/lib/types";

export default async function ProjectsPage(){
    const session = await auth();
    if(!session?.user?.id) return null;
    
    const projects: AllProjectsType[] = await getAllProjects({id: session.user.id});

    return (
        <div className="h-full flex flex-col gap-5">
            <div className="flex items-center justify-between">

                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Projects</h1>
                    <p className="flex-sm text-(--muted-foreground)">
                        { projects.length > 0
                            ? projects.length + " project" + (projects.length > 1 ? "s" : "" + " in total")
                            : "No projects added"
                        }
                    </p>
                </div>

                {/* ADD NEW PROJECT BUTTON */}
                <NewProjectButton />
            </div>

            {/* PROJECTS LIST */}
            <ProjectsList projects={projects} />
        </div>
    )
}