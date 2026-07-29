"use client"

import { usePageTitle } from "@/lib/hooks/pageTitle";
import { useEffect } from "react";

export function SetTitlePage({title} : {title: string}){
    const { setTitle } = usePageTitle();

    useEffect(() =>{
        setTitle(title);
    },[])

    return null;
}