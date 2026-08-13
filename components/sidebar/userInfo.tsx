import { auth } from "@/lib/auth"
import Image from "next/image";
import LogoutButton from "../buttons/bars/logoutButton";

export default async function SidebarUserInfo() {
    const session = await auth();
    if(!session?.user) return null;

    return (
        <div className="w-full flex flex-col border-t border-(--border) pb-3">
            <div className="flex gap-2 items-center p-5 pb-1">
                <Image 
                    className="rounded-full"
                    src={session.user.image ?? "/default-avatar.png"} 
                    alt={"User Icon"} 
                    width={30} 
                    height={30}
                />

                <div className="w-full min-w-0">
                    <h1 className="text-sm truncate">{session.user.name}</h1>
                    <p className="text-xs text-(--muted-foreground)">Full-Stack Developer</p>
                </div>
            </div>

            <LogoutButton />
        </div>
    )
}