import { Prisma } from "@prisma/client"
import Image from "next/image"

type MemberType = Prisma.ProjectMemberGetPayload<{
    select: {
        user: true,
        role: true
    }
}>

export default function MemberComponent({
    member, 
    index, 
    size
} : {
    member: MemberType,
    index: number,
    size: number
}){
    return (
        <div
            key={member.user.id}
            className="flex items-center gap-3 px-4 py-3"
            style={{
                borderBottom:
                    index < size - 1
                    ? "1px solid var(--border)"
                    : "none",
            }}
        >
            <Image
                width={32}
                height={32}
                src={member.user.image ?? ""}
                alt={member.user.name}
                className="rounded-full shrink-0"
            />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-(--foreground)">
                    {member.user.name}
                </p>

                <p className="text-xs text-(--muted-foreground)">
                    {member.role}
                </p>
            </div>

            {member.role === "Owner" && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium text-(--primary)
                bg-(--accent)`} >
                    Dono
                </span>
            )}
        </div>
    )
}