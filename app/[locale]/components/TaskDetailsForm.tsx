"use client";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { GrTextAlignFull } from "react-icons/gr";
import { TfiCommentAlt } from "react-icons/tfi";
import { useActionState, useEffect, useState } from "react";
import editTaskAction from "@/app/actions/editTaskAction";
import { TaskDetailsType } from "../types/taskDetailsType";
import toggleDoneAction from "@/app/actions/toggleDoneAction";
import TextArea from "./TextArea";
import { VscLoading } from "react-icons/vsc";
import { useTranslations } from "next-intl";
import { Link as IntLik } from "@/i18n/navigation";

export default function TaskDetailsForm({ taskDetails }: { taskDetails: TaskDetailsType }) {
  const [isEditingDesc, setIsEditingDesc] = useState<boolean>(false);
  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);
  const [task,setTask] = useState<TaskDetailsType>(taskDetails)
  const t = useTranslations("taskDetails")
  const [state, actionForm, isPending] = useActionState(
    editTaskAction.bind(null, task.id),
    { success: false, message: "" },
  );

  useEffect(()=>{
    if(state?.success && state?.task){
      setTask(state.task)
      setIsEditingComment(false)
      setIsEditingDesc(false)
    }
  },[state])
  

  const toggleDoneHandler = async()=>{
    const result = await toggleDoneAction({taskId:task.id,isDone:task.isDone})
    if(result.success){
      setTask(result.task)
    }
  }

  return (
    <section className="w-full py-6 md:py-10 flex flex-col gap-2">
      <div className="flex items-center justify-center m-4 px-4 py-2 rounded-lg bg-white/20 text-black dark:bg-black/20 dark:text-white w-max ">
        <IntLik  href={"/"}>
          {t("backLink")}
      </IntLik>
      </div>
      
      <form
        action={actionForm}
        className="flex w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-6 xl:flex-row xl:p-7 "
      > 
        <div className="flex w-full flex-col gap-5 xl:w-[62%]">
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">


            <button
              onClick={()=>toggleDoneHandler()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
            >
              {task?.isDone ? (
                <FaCheckCircle size={20} />
              ) : (
                <MdOutlineRadioButtonUnchecked size={20} />
              )}
            </button>


            <TextArea
              name="title"
              placeholder={t("fields.title")}
              value={task?.title}
            />


          </div>

          <label className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 max-h-80">


            <p className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200 md:text-xl">
              <span className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                <GrTextAlignFull size={18} />
              </span>
              {t("description")}
            </p>


            <TextArea
              setState={setIsEditingDesc}
              name="description"
              placeholder={t("fields.description")}
              value={task?.description}
            />


          </label>

          {isEditingDesc && (
            <div className="flex items-center gap-2">


              <button
              disabled={isPending}
                type="submit"
                className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-800"
              >{isPending?<VscLoading size={22} className="animate-spin"/>:t("fields.submitBtn")}
              </button>


              <button
                onClick={() => {
                  setIsEditingDesc(false);
                }}
                className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {t("fields.cancelBtn")}
              </button>


            </div>
          )}

          <div className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2">


            <div className="rounded-lg bg-white p-4 dark:bg-slate-900">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-400">
                {t("creator")}
              </p>

              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                
                <p className="font-medium">{task?.creator?.name}</p>
                <p className="break-all text-slate-500 dark:text-slate-400">
                  {task?.creator?.email}
                </p>

              </div>

            </div>


            <div className="rounded-lg bg-white p-4 dark:bg-slate-900">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
                {t("timeline")}
              </p>

              <div className="space-y-2 flex flex-col justify-between items-start text-sm text-slate-700 dark:text-slate-200">

                <p className="flex flex-col">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    {t("createDate")}:
                  </span>{" "}
                  <div className="flex items-center gap-2">
                    <span> {new Date(task?.createdAt).toLocaleDateString()} </span> {" | "}
                    <span> {new Date(task?.createdAt).toLocaleTimeString()} </span>
                  </div>
                  
                </p>
                
                <p className="flex flex-col">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    {t("updateDate")}:
                  </span>{" "}
                  <div className="flex items-center gap-2">
                    <span> {new Date(task?.updatedAt).toLocaleDateString()} </span> {" | "}
                    <span> {new Date(task?.updatedAt).toLocaleTimeString()} </span>
                  </div>
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 xl:w-[38%] max-h-[420px] overflow-y-scroll">


          <label className="flex w-full flex-col gap-3">

            <p className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200 md:text-xl">
              <span className="rounded-lg bg-sky-100 p-2 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                <TfiCommentAlt size={18} />
              </span>
              {t("addComment")}
            </p>

            
            <TextArea name="comment" placeholder="Add Comment" setState={setIsEditingComment}/>


          </label>


            
          {isEditingComment && (
            <div className="mt-3 flex items-center gap-2">


              <button
                disabled={isPending}
                type="submit"
                className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-800"
              >
                {isPending?<VscLoading size={22} className="animate-spin"/>:t("fields.submitBtn")}
              </button>


              <button
                onClick={() => {
                  setIsEditingComment(false);
                }}
                className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {t("fields.cancelBtn")}
              </button>


            </div>
          )}


          <div className="mt-5 space-y-3">


            {task?.Comments?.map((comment) => (
              <div
                key={comment?.id}
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
              >

                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {comment?.description}
                </p>

                <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">

                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {t("creator")}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                    {comment?.author?.name ? comment?.author?.name:"---"}
                  </p>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>{comment?.createdAt ? new Date(comment?.createdAt)?.toLocaleTimeString() : "---"}</span> {" | "}
                    <span>{comment?.createdAt? new Date(comment?.createdAt)?.toLocaleDateString():"---"}</span>
                  </p>

                </div>


              </div>
            ))}


          </div>
        </aside>
      </form>
    </section>
  );
}
