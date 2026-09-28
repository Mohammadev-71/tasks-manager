import { useDraggable } from "@dnd-kit/react";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { GrTextAlignFull } from "react-icons/gr";
import { TfiCommentAlt } from "react-icons/tfi";
import toggleDoneAction from "@/app/actions/toggleDoneAction";
import { MdDeleteOutline } from "react-icons/md";
import deleteTaskAction from "@/app/actions/deleteTaskaction";
import useTasks from "../Store/tasks-store";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TaskType } from "../types/taskType";

export default function TaskComponent({ task }: { task: TaskType }) {
  const { ref } = useDraggable({ id: task.id });
  const t = useTranslations("home");
  const deleteTask = useTasks((state) => state.deleteTask);
  const updateTask = useTasks((state) => state.updateTask);
  
  
  const toggleDoneHandler = async (taskId: string) => {
    const result = await toggleDoneAction({ taskId, isDone:task?.isDone });
    if(!result.success){
      return
    }
    
    updateTask(result.task);
    
  };

  const deleteHandler = async ({ id }: { id: string }) => {
    const result = await deleteTaskAction({ taskId: id });
    if (result.success && result.message === "DELETED") {
      deleteTask(id);
    } else if (!result.success && result.message === "NOT_OWNER") {
      alert(t(`${result.message}`));
    }
  };

  return (
    <div
      ref={ref}
      className="flex w-full flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex items-start gap-2">

        <div className="flex w-full items-center gap-2">


          <button
            className="text-sky-700"
            onClick={() => {
              toggleDoneHandler(task.id);
            }}
          >
            {task.isDone ? (
              <FaCheckCircle size={18} />
            ) : (
              <MdOutlineRadioButtonUnchecked size={18} />
            )}
          </button>


          <Link href={`/task-details/${task.id}`} className="min-w-0 flex-1">
            <p
              className={`truncate text-sm font-medium text-slate-700 dark:text-slate-100 ${task.isDone ? "text-gray-500 line-through dark:text-slate-400" : ""}`}
            >
              {task.title}
            </p>
          </Link>


        </div>

        <button
          onClick={() => {
            deleteHandler({ id: task.id });
          }}
          className="text-red-500 transition-transform duration-150 hover:scale-110"
        >
          <MdDeleteOutline size={18} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">


        {task.description && <GrTextAlignFull size={12} />}


        {task.Comments?.length > 0 && (

          <div className="flex items-center gap-1">
            <TfiCommentAlt size={12} />
            {task.Comments.length}
          </div>

        )}


      </div>
    </div>
  );
}
