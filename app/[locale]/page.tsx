import { redirect } from "next/navigation";
import getAllTasks from "../actions/getAllTask";
import PageHeader from "./components/PageHeader";
import TaskCard from "./components/TaskCard";





export default async function Home() {

  const tasks = await getAllTasks()


  if((!tasks.success && tasks.message==="UNAUTHORIZED")){
    redirect("/signin")
  }


  return (
    <div className="flex flex-col w-full gap-8">

      <PageHeader title="Tasks List"/>

      <div className="flex flex-wrap w-full h-auto gap-8 p-8 items-start justify-center">
        {
          tasks?.tasks?.map((task)=>(
            <TaskCard key={task.id} task={task}/>
          ))
        }
      </div>
      
    </div>
  );
}
