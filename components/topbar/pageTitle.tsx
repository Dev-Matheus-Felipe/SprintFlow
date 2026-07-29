"use client"

import { pageTitles } from "@/lib/data/generalData";
import { usePageTitle } from "@/lib/hooks/pageTitle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopbarPageTitle(){
    const pathname = usePathname();

    const [name, setName] = useState(pageTitles[pathname]);
    const { title } = usePageTitle();

    useEffect(() => {
        const newName = pageTitles[pathname];
        setName(newName || title);

    }, [title, pathname]);


    return <h1 className="text-md font-bold">{name}</h1>;
}