import { Plus } from "lucide-react";

export default function TSHeaderLoading({
    children
} : {
    children: React.ReactElement
}){
    return (
        <div className="flex-1 overflow-y-auto p-3 flex flex-col w-full gap-5">
            <div className="flex flex-col gap-5">
                <div className="flex flex-1 items-center gap-3 mb-3 flex-wrap max-xs:flex-col max-xs:gap-5 xs:justify-between">

                    <div className="w-50 h-10 bg-(--card) rounded-md" />
                    <div 
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium 
                        transition-colors bg-(--primary) text-(--primary-foreground) cursor-pointer
                        w-15`}
                    >
                        <Plus size={14} />
                        ...
                    </div>
                </div>

                {children}

                <div className="w-full flex justify-center mt-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--primary) border-t-black" />
                </div>
            </div>
        </div>
    )
}
