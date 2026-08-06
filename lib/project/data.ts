import { 
    Zap, 
    Rocket, 
    Palette, 
    RefreshCw, 
    Smartphone, 
    Globe, 
    Shield, 
    ChartColumn,
    CheckSquare,
    Activity,
} from "lucide-react";

// ------------------------------------------ PROJECT DATA ------------------------------------------ //

export const ProjectStatus = ["Active", "Paused", "Completed", "Cancelled"] as const;

export const ProjectIcons = new Map([
    ["Zap", Zap],
    ["Rocket", Rocket],
    ["Palette", Palette],
    ["RefreshCw", RefreshCw],
    ["Smartphone", Smartphone],
    ["Globe", Globe],
    ["Shield", Shield],
    ["ChartColumn", ChartColumn],
] as const);

export const ProjectStatusColors = new Map([
    ["Completed", "#27e619"],
    ["InReview", "#ebd726"],
    ["InProgress", "#1b5af7"],
    ["Todo", "#27e619"],
]);




// ---------------------------------- PROJECT OVERVIEW ---------------------------------- //

export const views: {
    icon: ProjectViewIcon,
    label: string,
    description: string,
    url: "sprints" | "tasks"
}[] = [
    {
        icon: "checkSquare",
        label: "Tasks",
        description: "Complete list of tasks and filters",
        url: "tasks"
    },
    {
        icon: "activity",
        label: "Sprints",
        description: "Sprint planning and progress",
        url: "sprints"
    },
];
 


export const projectViewIcons = {
  checkSquare: CheckSquare,
  activity: Activity,
};

export type ProjectViewIcon = keyof typeof projectViewIcons;