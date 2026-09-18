'use client'


import getAllUser from "@/app/actions/getAllUsers"
import PageHeader from "../components/PageHeader"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Link as IntLink } from "@/i18n/navigation"
import addTask from "@/app/actions/addTask"
import { redirect } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import ErrorMessage from "../components/ErrorMessage"
import { AiOutlineLoading } from "react-icons/ai";



export default function NewTask(){
    const t = useTranslations("newTask")
    const [users, setUsers] = useState<any>([])
    const [mentionedTo, setMentionedTo] = useState<any>([])
    const [task, setTask] = useState<any>()
    const [error,setError] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(()=>{
        const getUsers = async()=>{
            try {
                setLoading(true)
                const {data:session} = await authClient.getSession()

                if(!session || !session.user){
                    redirect('/signin')
                }

                const usrs = await getAllUser()
                setUsers(usrs?.users)
                
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
            
        }

        getUsers()
    },[])
    
    const toggleMention = (id: string) => {
        setMentionedTo((prev:any) => {
            if (prev.includes(id)) {
                return prev.filter((mention:any) => mention !== id);
            }

            return [...prev, id];
        });
    };

    const addTaskHandler = async()=>{
        try {
            setLoading(true)
            const result  = await addTask({
                title:task?.title,
                description:task?.description,
                mentionedTo:mentionedTo
            })
            
            if(result.success){
                redirect('/')
            }
            setError(result.message[0])
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }


    

    return(
        <div className="w-screen h-screen flex flex-col justify-start items-start">
            <PageHeader title={t("title")}/>
            <form onSubmit={(e)=>{e.preventDefault(); addTaskHandler()}} className="flex flex-col w-full p-8 gap-8">
                
                <label className="flex flex-col gap-4 text-lg">
                    {t("fields.title")}
                    <input onChange={(e)=>{setTask({...task,title:e.target.value})}} placeholder={t("fields.title")} className="shadow-sm shadow-sky-400 w-full p-2.5 rounded-lg text-sky-700 outline-none bg-gray-100 dark:bg-transparent" type="text" />
                    {error.message&&(
                        <ErrorMessage intl="newTask.errors" isHidden={error?.path[0] ==="title"} error={error?.message} field={t("fields.title")}/>
                    )}
                    
                </label>
                
                <label className="flex flex-col gap-4 text-lg">
                    {t("fields.description")}
                    <textarea onChange={(e)=>{setTask({...task,description:e.target.value})}} className="shadow-sm shadow-sky-400 p-4 rounded-lg text-sky-700 outline-none bg-gray-100 dark:bg-transparent field-sizing-content min-h-24 max-h-80 w-full resize-none"  placeholder={t("fields.description")} />
                    {
                        error.message && (
                            <ErrorMessage intl="newTask.errors" isHidden={error?.path[0] ==="description"} error={error?.message} field={t("fields.description")}/>
                        )
                    }
                    
                </label>
                
                <div className=" w-full flex  justify-center items-center flex-col gap-8 text-lg">
                    {t("fields.mentioned")}
                    <div className=" h-auto flex flex-wrap gap-4">
                        {   users.length > 0 &&(
                                users?.map((user:any)=>(
                                    <div onClick={()=>{toggleMention(user.id)}} className={`p-4 shadow-sm shadow-sky-700 rounded-lg ${mentionedTo.includes(user.id)?"bg-sky-600":"bg-gray-100 dark:bg-transparent"}`} key={user?.id}>{user?.name}</div>
                                ))
                            )
                            
                        }
                    </div>

                    {error.message&&(
                        <ErrorMessage intl="newTask.errors" isHidden={error?.path[0] ==="mentionedUsers"} error={error?.message} field={t("fields.mentioned")}/>
                    )}
                    
                </div>
                
                <div className="flex gap-4 justify-center items-center my-8 text-lg">
                    <button disabled={loading} type="submit" className="py-2 px-4 bg-sky-600 dark:bg-sky-600/30 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300">{loading?<AiOutlineLoading className="animate-spin" size={20}/>:t("submit")}</button>
                    <IntLink className="py-2 px-4 bg-red-500 dark:bg-red-600/30 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300" href={'/'}>
                        {t("cancel")}
                    </IntLink>
                </div>
                
            </form>
        </div>
    )
}