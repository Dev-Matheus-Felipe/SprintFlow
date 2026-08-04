"use client"

import { standardColors } from "@/components/modals/newSprintModal"
import React, { Dispatch } from "react"

export default function CancelModal({
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