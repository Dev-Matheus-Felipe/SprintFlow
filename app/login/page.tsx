import LoginForm from "@/components/login/form";
import { Zap } from "lucide-react";
import Image from "next/image";

const tags: string[] = ["Kanban board", "Sprint planning","Team analytics", "Real-time updates"];

export default function LoginPage(){
    return (
        <div className="w-full min-h-screen flex">

            {/* LEFT SIDE */}
            <div
                className="min-h-screen md:w-1/2 md:flex z-5 relative p-[3%] hidden flex-col gap-12 justify-center"
                style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
            >
                {/* BLUR */}
                 <div
                    className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
                    style={{ background: "#6d6ef7" }}
                />
                
                <div
                    className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full opacity-15 blur-3xl"
                    style={{ background: "#10b981" }}
                />

                {/* SQUARES */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#6d6ef7"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* TITLE */}
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded">
                        <Zap size={16} color="#fff" fill="#fff" />
                    </div>

                    <h1 className="text-2xl font-bold">SprintFlow</h1>
                </div>

                {/* DESCRIPTIONS */}
                <div className="flex flex-col gap-10">
                    <h1 className="text-4xl font-bold">Manage projects with precision and agility.</h1>

                    <p className="text-blue-200 text-lg">
                        Kanban, sprints, metrics, and team collaboration—all on a modern, intuitive platform.
                    </p>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3">
                    {
                        tags.map((e) => (
                            <p 
                                key={e} 
                                className={`px-3 py-1 rounded-full text-sm font-medium border border-[rgba(109,110,247,0.3)]
                                bg-[rgba(109,110,247,0.2)] text-blue-200`}
                            >
                                {e}
                            </p>
                        ))
                    }
                </div>

                {/* FEEDBACK */}
                <div 
                    className="flex flex-col gap-5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded p-5"
                >
                    <p className="text-blue-100">
                        "O FlowDesk transformou como nosso time trabalha. 
                        A visibilidade do progresso e o kanban intuitivo economizaram horas de reuniões por semana."
                    </p>
                    
                    <div className="flex gap-2 items-center">
                        <Image 
                            className="rounded-full"
                            src={"/userLoginImage.jpg"} 
                            alt={"Imagem recomendação usuário"} 
                            width={35} 
                            height={35} 
                        />

                        <p className="font-bold">Matheus Felipe</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <LoginForm />
        </div>
    )
}