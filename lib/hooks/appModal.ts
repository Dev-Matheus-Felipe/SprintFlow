"use client"

import { AppModalsContext } from "@/components/providers/appModalsProvider";
import { useContext } from "react"

export default function useAppModal(){
    const modal = useContext(AppModalsContext);

    if(!modal ){
        throw new Error("USE APP MODAL ERROR");
    }

    return {
        modal,
    }
}