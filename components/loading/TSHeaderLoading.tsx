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

                </div>

                {children}

                <div className="w-full flex justify-center mt-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--primary) border-t-black" />
                </div>
            </div>
        </div>
    )
}
