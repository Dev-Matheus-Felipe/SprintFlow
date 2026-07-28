import { AllFiltersType } from "@/components/projects/projectsContainer";
import { 
    Zap, 
    Rocket, 
    Palette, 
    RefreshCw, 
    Smartphone, 
    Globe, 
    Shield, 
    ChartColumn, 
} from "lucide-react";

// ------------------------------------------ PROJECT DATA ------------------------------------------ //

export const ProjectColors = ["BLUE", "GREEN", "ORANGE", "RED", "PURPLE", "CYAN"] as const;

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


export const ProjectIconNames = [
  "Zap",
  "Rocket",
  "Palette",
  "RefreshCw",
  "Smartphone",
  "Globe",
  "Shield",
  "ChartColumn",
] as const;

export const AllFilters: AllFiltersType[] = [
    {name: "Todos", filter: "TODOS"},
    {name: "Ativo", filter: "ATIVO"},
    {name: "Em Pausa", filter: "EM_PAUSA"},
    {name: "Finalizado", filter: "FINALIZADO"},
    {name: "Abortado", filter: "ABORTADO"},
];

export const statusColor = new Map([
    ["PLANEJAMENTO", {color: "#2563EB", background: "rgba(37, 99, 235, 0.15)"}],
    ["ATRASADO", {color: "#DC2626", background: "rgba(220, 38, 38, 0.15)"}],
    ["ATIVO", {color: "#16A34A", background: "rgba(22, 163, 74, 0.15)"}],
    ["CONCLUIDO", {color: "#15803D", background: "rgba(21, 128, 61, 0.15)"}],
]);