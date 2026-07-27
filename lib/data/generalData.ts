import { 
    Activity, 
    CheckSquare, 
    FolderKanban, 
    LayoutDashboard, 
    Zap, 
    Rocket, 
    Palette, 
    RefreshCw, 
    Smartphone, 
    Globe, 
    Shield, 
    ChartColumn, 
} from "lucide-react";

export const mainNav = [
    {Icon: LayoutDashboard, label: "Dashboard", url: "/dashboard"},
    {Icon: FolderKanban, label: "Projects", url: "/projects"},
    {Icon: CheckSquare, label: "My Tasks", url: "/myTasks"},
    {Icon: Activity, label: "Sprints", url: "/sprints"},
];

export const pageTitles = Object.fromEntries(
    mainNav.map(({url, label}) => [url, label])
);

export const ProjectColors = ["BLUE", "GREEN", "ORANGE", "RED", "PURPLE", "CYAN"];



export const ProjectIcons = [
  Zap,
  Rocket,
  Palette,
  RefreshCw,
  Smartphone,
  Globe,
  Shield,
  ChartColumn,
];