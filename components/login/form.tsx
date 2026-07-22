"use client"

import { GitBranch, Globe, Link } from "lucide-react";

const buttonsClass = `w-full flex text-md items-center justify-center gap-2 h-11.5 rounded-lg bg-(--secondary) 
cursor-pointer hover:bg-(--primary) duration-200`;

export default function LoginForm(){

    return (
        <div className="md:w-1/2 w-full h-screen md:py-[7%] max-md:p-[7%] flex  justify-center relative">

            {/* TITLE */}
            <div className="md:w-[80%] lg:w-[65%] w-full flex flex-col gap-11">
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-(--muted-foreground)">Login in with your preference method</p>
                </div>

                {/* LOGIN OPTIONS */}
                <div className="flex flex-col gap-4 ">
                    <button className={buttonsClass}>
                        <GitBranch size={16} />
                        Login with Github
                    </button>

                    <button className={buttonsClass}>
                        <Globe size={16} />
                        Login with Google
                    </button>

                    <button className={buttonsClass}>
                        <Link size={16} />
                        Login with Linkedln
                    </button>
                </div>

                
                {/* FOOTER */}
                <div className="flex flex-col gap-3">
                    <div className="w-full flex items-center gap-2 flex-wrap">
                        <div className="flex-1 bg-(--muted-foreground) h-0.5 rounded" />
                        <p>Security Access</p>
                        <div className="flex-1 bg-(--muted-foreground) h-0.5 rounded" />
                    </div>

                    <p className="text-sm text-justify">
                        Sign in to access your personalized workspace, manage projects with confidence, 
                        monitor sprint progress, and collaborate efficiently with your team from anywhere.
                    </p>
                </div>
            </div>

            <p className="fixed right-2 bottom-2 text-sm text-(--muted-foreground)">© 2026 SprintFlow. All rights reserved.</p>
        </div>
    )
}