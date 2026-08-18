"use client"

import useProjectApp from "@/lib/hooks/projectApp";
import addNewUser from "@/lib/project/components/addNewUser";
import { NewUserSchema, NewUserSchemaType } from "@/lib/zod/newUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react"
import { useForm } from "react-hook-form";

const roleOptions = ["Member", "Owner", "Admin"];

export default function NewUserModal({close} : {close: () => void}){
    const { projectData } = useProjectApp();
    const { data } = projectData;
    
    const {
        register,
        handleSubmit,


    } = useForm<NewUserSchemaType>({
        resolver: zodResolver(NewUserSchema)
    });

    const handleAddNewUser = async(formData: NewUserSchemaType) => {
        if(!data?.projectId) return;

        const res = await addNewUser({projectId: data.projectId, formData});
        alert(res.message);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)]">
            <div
                className={`w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden
                bg-(--card) border border-(--border) p-5`}
            >

                <div className="flex justify-between items-center w-full pb-3 border-b border-(--border)">
                    <h2 className="text-(--muted-foreground) text-sm">Add New User</h2>

                    <button className="p-1.5 rounded cursor-pointer hover:bg-(--muted)" onClick={close}>
                        <X size={14}  />
                    </button>
                </div>

                <form className="mt-3" onSubmit={handleSubmit(handleAddNewUser)}>
                    <div>
                        <label className="text-xs font-medium mb-2 text-(--muted-foreground) block">
                            Email
                        </label>

                        <input 
                            {...register("email")}
                            placeholder="user email" 
                            className={`w-full px-3 py-2 rounded-lg text-sm outline-none resize-none bg-(--secondary)
                            text-(--foreground)`}
                        />
                    </div>

                    <div className="mt-4">
                        <p className="text-xs font-medium mb-2 text-(--muted-foreground)">
                            Role
                        </p>

                        <select
                            {...register("role")}
                            className={`w-full px-2.5 py-2 rounded-lg text-xs outline-none appearance-none
                            text-(--foreground) bg-(--secondary) border border-(--border) cursor-pointer`}
                        >
                            { roleOptions.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            )) }
                        </select>
                    </div>

                    <div className="w-full flex justify-end mt-4">
                        <button type="submit" className="bg-(--primary) px-2.5 py-1 rounded text-sm cursor-pointer">
                            Invite
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}