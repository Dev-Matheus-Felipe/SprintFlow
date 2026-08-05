import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import CloseModal from "../buttons/closeModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewSprintSchema, NewSprintSchemaType } from "@/lib/zod/newSprintSchema";
import PostNewSprint from "@/lib/sprint/postNewSprint";
import { useParams } from "next/navigation";

export const standardColors = "bg-(--secondary) border border-(--border) text-(--foreground)";

export default function NewSprintModal({
    setOpen,
} : {
    setOpen: (open: boolean) => void
}){

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<NewSprintSchemaType>({
        resolver: zodResolver(NewSprintSchema)
    });

    const params = useParams<{url: string}>();
    const url = params.url;

    const handleNewSprint = async(data: NewSprintSchemaType) => {
        const res = await PostNewSprint({data, url});
        alert(res.message);

        if(res.sucess) setOpen(false);
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">
            <div className="w-full max-w-md rounded-2xl p-6 shadow-2xl bg-(--card) border border-(--border)">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-(--foreground)">
                        New Sprint
                    </h2>

                    <CloseModal 
                        setOpen={setOpen}
                        style={"text-(--muted-foreground) cursor-pointer hover:bg-(--secondary) p-1 rounded"}
                    >
                        <X size={16} />
                    </CloseModal>

                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleNewSprint)}>
                    <div>
                        <label className={`block text-sm font-medium mb-1.5 text-(--foreground)`}>
                            Name
                        </label>

                        <input
                            autoFocus
                            placeholder="Ex: Sprint 15"
                            {...register("name")}
                            className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none ${standardColors}`}
                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />

                        {errors.name && <p className="text-xs text-red-500 pt-2">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-(--foreground)">
                            Objective
                        </label>

                        <textarea
                            placeholder="What is the purpose of this sprint?"
                            rows={2}
                            {...register("objective")}
                            className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none ${standardColors}`}
                            onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />

                        {errors.objective && <p className="text-xs text-red-500 pt-2">{errors.objective.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-(--foreground)">
                                Start
                            </label>

                            <input
                                type="date"
                                {...register("startAt", {valueAsDate: true})}
                                className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none ${standardColors} cursor-pointer`}
                            />

                            {errors.startAt && <p className="text-xs text-red-500 pt-2">{errors.startAt.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-(--foreground)">
                                Deadline
                            </label>

                            <input
                                type="date"
                                {...register("endAt", {valueAsDate: true})}
                                className={`w-full px-3 py-2.5 rounded-lg text-sm outline-none ${standardColors} cursor-pointer`}
                            />

                            {errors.endAt && <p className="text-xs text-red-500 pt-2">{errors.endAt.message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <CloseModal 
                            setOpen={setOpen} 
                            children={"Cancel"} 
                            style={`flex-1 py-2.5 rounded-lg text-sm font-medium ${standardColors} cursor-pointer`} />

                        <button
                            type="submit"
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold bg-(--primary) text-(--primary-foreground)
                            cursor-pointer`}
                        >
                            Create Sprint
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}