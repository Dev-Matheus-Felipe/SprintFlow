import { TitlePageContext } from "@/components/providers/titlePageProvider";
import { useContext } from "react";

export function usePageTitle() {
    const ctx = useContext(TitlePageContext);
    if (!ctx) throw new Error("usePageTitle must be used within the PageTitleProvider");

    return ctx;
}