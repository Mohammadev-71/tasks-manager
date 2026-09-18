'use client'

import addSolve from "@/app/actions/addSolve"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Link as IntLink } from "@/i18n/navigation"
import { AiOutlineLoading } from "react-icons/ai";
import ErrorMessage from "./ErrorMessage"

export default function SolveCard({taskId}:{taskId:string}){


    const [solve, setSolve] = useState<any>()
    const t = useTranslations("task")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>({})


    const NewSolveHandler = async()=>{
        try {
            setLoading(true)
            const result = await addSolve({
                title:solve?.title,
                description:solve?.description,
                taskId:taskId,
                status:solve?.status
            })

            if(!result.success){
                setError((result as { message?: string[] })?.message?.[0] || "");
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }

    return(
        <form onSubmit={(e)=>{e.preventDefault(); NewSolveHandler()}} className="p-4 flex flex-col just-center items-center w-full gap-4">

            <label className="flex flex-col gap-2 w-full items-start text-lg">
                {t("fields.title")}
                <input defaultValue={solve?.title||""} onChange={(e)=>{setSolve({...solve, title:e.target.value})}} className="shadow-sm shadow-sky-400 w-full p-2.5 rounded-lg text-sky-500 dark:text-sky-400 outline-none"  type="text" />
                {error.message&&(
                    <ErrorMessage intl="task.errors" isHidden={error?.path[0] ==="title"} error={error?.message} field={t("fields.title")}/>
                )}
            </label>
            

            <label className="flex flex-col gap-2 w-full items-start text-lg">
                {t("fields.description")}
                <textarea defaultValue={solve?.description||""} onChange={(e)=>{setSolve({...solve, description:e.target.value})}} className="shadow-sm shadow-sky-400 p-4 rounded-lg text-sky-700 outline-none bg-gray-100 dark:bg-transparent field-sizing-content min-h-24 max-h-80 w-full resize-none"  ></textarea>
                {error.message&&(
                    <ErrorMessage intl="task.errors" isHidden={error?.path[0] ==="description"} error={error?.message} field={t("fields.description")}/>
                )}
            </label>
            
            <label className="flex flex-col gap-2 w-full items-start text-lg">
                {t("fields.status")}
                <select defaultValue={solve?.status||""} onChange={(e)=>{setSolve({...solve, status:e.target.value})}} className="shadow-sm shadow-sky-400 w-full p-2.5 rounded-lg text-sky-500 dark:text-sky-400 outline-none" >
                    <option value="">Change Task Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                {error.message&&(
                    <ErrorMessage intl="task.errors" isHidden={error?.path[0] ==="status"} error={error?.message} field={t("fields.status")}/>
                )}
            </label>
            

            <div className="flex gap-4 justify-center items-center my-8 text-lg">
                <button disabled={loading} type="submit" className="py-2 px-4 bg-sky-600 dark:bg-sky-600/30 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300">
                    {loading?<AiOutlineLoading className="animate-spin" size={20}/>:t("fields.submitBtn")}
                </button>
                <IntLink href={"/"} className="py-2 px-4 bg-red-500 dark:bg-red-600/30 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300">
                    {t("fields.cancelBtn")}
                </IntLink>
            </div>
            

        </form>
    )
}