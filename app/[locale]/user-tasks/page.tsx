import getUserTasks from "@/app/actions/getUserTasks";
import PageHeader from "../components/PageHeader";
import TaskCard from "../components/TaskCard";
import { redirect } from "next/navigation";




export default async function UserTasks() {

    const tasks = await getUserTasks()
    if((!tasks.success && tasks.message==="UNAUTHORIZED")){
        redirect("/signin")
    }
    return (
        <div className="flex flex-col w-full gap-8">

            <PageHeader title=" Your Tasks List"/>

            <div className="flex flex-wrap w-full h-auto gap-8 p-8 items-start justify-center">
                {
                tasks?.tasks?.map((task)=>(
                    <TaskCard key={task.id} task={task}/>
                ))
                }
            </div>
        
        </div>
    )
}
