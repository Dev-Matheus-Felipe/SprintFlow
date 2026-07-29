"use client"

import React, { createContext, Dispatch, useState } from "react";

type TitlePageType = {
    title: string,
    setTitle: Dispatch<React.SetStateAction<string>>
}

export const TitlePageContext = createContext<TitlePageType | null>(null);

export function TitlePageProvider({children} : {children: React.ReactNode}){
    const [title, setTitle] = useState<string>("");

    return (
        <TitlePageContext.Provider value={{title, setTitle}}>
            {children}
        </TitlePageContext.Provider>
    )
};
