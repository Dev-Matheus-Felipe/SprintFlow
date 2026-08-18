import ProjectDataProvider from "@/components/providers/project/projectDataProvider";
import ProjectModalsProvider from "@/components/providers/project/projectModalsProvidert";
import RoleProvider from "@/components/providers/project/roleProvider";
import { auth } from "@/lib/auth";
import getRole from "@/lib/project/getRole";

export default async function ProjectLayout({
    children, 
    params,
} : {
    children: React.ReactNode,
    params: Promise<{url: string;}>
}){
    const { url } =  await params;

    const validUrl = url
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    const session = await auth();
    const res = await getRole({userId: session?.user?.id ?? "", url: validUrl});

    if(!res || !session) return null;

    return (
        <RoleProvider role={res.role}>
            <ProjectDataProvider>
                    <ProjectModalsProvider>
                        {children}
                    </ProjectModalsProvider>
            </ProjectDataProvider>
        </RoleProvider>
    )
}