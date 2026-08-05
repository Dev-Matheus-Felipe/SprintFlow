"use client"

import React from "react"

export default function CloseModal({
    setOpen,
    children,
    style,
} : {
    setOpen: (open: boolean) => void,
    children: React.ReactNode,
    style: string
}){
    return (
        <button
            type="button"
            onClick={() => setOpen(false)}
            className={style}
        >
            {children}
        </button>
    )
}