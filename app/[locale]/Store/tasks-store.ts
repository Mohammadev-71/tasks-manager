import { create } from "zustand";
import { TaskType } from "../types/taskType";



type TaskStore = {
  tasks:TaskType[];
  setTask:(task:TaskType)=>void;
  addTask:(newTask:TaskType)=>void;
  reorderTask:(taskId:string,listId:string)=>void;
  deleteTask:(taskId:string)=>void;
  updateTask:(newTask:TaskType)=>void;
}



const useTasks = create<TaskStore>()((set)=>({
  tasks:[],
  setTask: (tasks) => set({ tasks }),
  addTask:(newTask)=>set((state)=>({
    tasks:[...state.tasks,newTask]
  })),

  reorderTask: (taskId,listId) =>
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? {...task,listId:listId} : task
    ),
  })),

  deleteTask:(taskId)=>set((state)=>({
    tasks:state.tasks.filter((task)=>task.id !==taskId)
  })),


  updateTask:(newTask)=>set((state)=>({
    tasks:state.tasks.map((task)=>(
      task.id===newTask.id?{...task,...newTask}:task
    ))
  })),
}))


export default useTasks