import TSHeaderLoading from "@/components/loading/TSHeaderLoading";

const tableHeaders = ["Tasks", "Status", "Priority", "Responsible", "Deadline", "Points"];

export default function ProjectTaskLoading(){
    return (
        <TSHeaderLoading>
            <div className="flex flex-col flex-1 gap-5">
                <div className="flex gap-2">
                    <div className="w-80 h-10 bg-(--card) rounded" />
                    <div className="w-30 h-10 rounded bg-(--card)" />
                </div>

                <table className="w-full min-w-100">
                    <thead>
                        <tr className="border-y border-(--border)" >
                        { tableHeaders.map((h) => (
                            <th
                                key={h}
                                className={`text-left px-4 py-3 text-xs font-medium uppercase tracking-wider 
                                text-(--muted-foreground) ${h == "Points" && "max-md:hidden"}`}
                            >
                                {h}
                            </th>
                        )) }
                        </tr>
                    </thead>
                </table>
            </div>
        </TSHeaderLoading>
    )
}