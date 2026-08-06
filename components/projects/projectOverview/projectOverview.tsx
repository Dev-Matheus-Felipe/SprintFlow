import { ProjectOverviewType } from "@/lib/types";
import Banner from "./banner";
import { views } from "@/lib/project/data";
import SprintComponent from "./sprint";
import MemberComponent from "./member";
import ProjectViewButton from "@/components/buttons/project/projectViewButton";
import NewMemberButton from "@/components/buttons/project/newMemberButton";

export default function ProjectOverview({
    project,
} : {
    project: ProjectOverviewType,
}){
    
    const projectSprints = project.sprints;

    return (
        <div className="flex-1 overflow-y-auto">

            {/* MAIN INFO - BANNER */}
            <Banner project={project} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Views */}
                <div className="lg:col-span-2">

                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Views
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {views.map((view) => (
                        <ProjectViewButton view={view} key={view.label} project={project}  /> ))}

                    </div>
                    

                    {/* Sprints */}
                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Sprints
                    </h3>
                    
                    <div className="space-y-2">
                        {projectSprints.length > 0 
                            ? projectSprints.map((sprint) => {
                                const sprintTasks = project.tasks.filter((t) => t.sprintId === sprint.id);
                                const sprintDone = sprintTasks.filter((t) => t.status === "Completed").length;

                                return (
                                    <SprintComponent 
                                        key={sprint.id}
                                        sprint={sprint}
                                        tasksLength={sprintTasks.length}
                                        sprintDone={sprintDone}
                                    />
                                );

                            })

                            : <p className="text-xs underline">No sprints created yet.</p>
                        }
                    </div>
                </div>

                {/* Members */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-(--foreground)">
                            Members ({project.members.length})
                        </h3>

                        <NewMemberButton />
                    </div>

                    <div className="rounded-xl overflow-hidden bg-(--card) border border-(--border)">
                        {project.members.map((member, i) => (
                            <MemberComponent 
                                key={member.user.id}
                                member={member} 
                                index={i} 
                                size={project.members.length} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}