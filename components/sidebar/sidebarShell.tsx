"use client"

export default function SidebarShell({
    children,
    open,
} : {
    children: React.ReactNode,
    open: boolean
}){

    return (
        <aside className={`w-60 h-screen flex flex-col bg-(--sidebar) relative max-md:absolute
        duration-500 ${open ? "max-md:left-0" : "max-md:left-[-110%]"}`}>
            {children}
        </aside>
    )
}