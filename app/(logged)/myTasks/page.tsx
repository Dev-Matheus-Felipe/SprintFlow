import TaskPage from "@/components/task/taskPage";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import getAllTasks from "@/lib/task/getAllTasks";

export default async function MyTasksPage(){
    const session = await auth();

    if(!session?.user?.id) return null;

    const tasks = await getAllTasks({userId: session.user.id});
    
    return (
        <TaskPage tasks={tasks} />
    )
}