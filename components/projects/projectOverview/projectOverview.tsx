import ProjectViewButton from "@/components/buttons/project/projectViewButton";
import NewMemberButton from "@/components/buttons/project/newMemberButton";
import { ProjectOverviewType } from "@/lib/types";
import { ProjectRoles } from "@prisma/client";
import { views } from "@/lib/project/data";
import MemberComponent from "./member";
import SprintComponent from "./sprint";
import Banner from "./banner";

const buttonStyle = `flex items-center gap-1 text-xs transition-colors text-(--primary) cursor-pointer`;

export default function ProjectOverview({
    project,
    role,
} : {
    project: ProjectOverviewType,
    role: ProjectRoles,
}){
    
    const projectSprints = project.sprints;

    return (
        <div className="flex-1 overflow-y-auto">

            {/* MAIN INFO - BANNER */}
            <Banner project={project} role={role} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* VIEWS */}
                <div className="lg:col-span-2">

                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Views
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    { views.map((view) => (
                        <ProjectViewButton view={view} key={view.label} project={project}  /> ))}

                    </div>
                    

                    {/* SPRINTS */}
                    <h3 className="text-sm font-semibold mb-3 text-(--foreground)">
                        Sprints
                    </h3>
                    
                    <div className="space-y-2">
                        { projectSprints.length > 0 
                            ? projectSprints.map((sprint) => {
                                const sprintDone = sprint.tasks.filter((t) => t.status === "Completed").length;

                                return (
                                    <SprintComponent 
                                        key={sprint.id}
                                        sprint={sprint}
                                        tasksLength={sprint.tasks.length}
                                        sprintDone={sprintDone}
                                    />
                                );

                            })

                            : <p className="text-xs underline">No sprints created yet.</p>
                        }
                    </div>
                </div>

                {/* MEMBERS */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-(--foreground)">
                            Members ({project.members.length})
                        </h3>

                        { role != "Member" &&  <NewMemberButton style={buttonStyle} /> }
                    </div>

                    <div className="rounded-xl overflow-hidden bg-(--card) border border-(--border)">
                        { project.members.map((member, i) => (
                            <MemberComponent 
                                key={member.user.id}
                                member={member} 
                                index={i} 
                                size={project.members.length} 
                            />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}