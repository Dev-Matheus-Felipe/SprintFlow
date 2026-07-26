import { Activity, CheckSquare, FolderKanban, LayoutDashboard } from "lucide-react";

export const mainNav = [
    {Icon: LayoutDashboard, label: "Dashboard", url: "/dashboard"},
    {Icon: FolderKanban, label: "Projects", url: "/projects"},
    {Icon: CheckSquare, label: "My Tasks", url: "/myTasks"},
    {Icon: Activity, label: "Sprints", url: "/sprints"},
];

export const pageTitles = Object.fromEntries(
    mainNav.map(({url, label}) => [url, label])
);

