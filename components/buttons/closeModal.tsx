"use client"

import React from "react"

export default function CloseModal({
    close,
    children,
    style,
} : {
    close: () => void,
    children: React.ReactNode,
    style: string
}){
    return (
        <button
            type="button"
            onClick={close}
            className={style}
        >
            {children}
        </button>
    )
}