'use client'

import { usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import ThemeSwitcher from "./ThemeSwitcher"
import LanguageSwitcher from "./LanguageSwitcher"
import { useEffect, useState } from "react"
import getUserDetails from "@/app/actions/getUserDetails"
import { Link as IntLink } from "@/i18n/navigation"


export default function Sidebar(){
    const pathname= usePathname()
    const t = useTranslations("sidebar")
    const [user,setUser] = useState<any>()

    useEffect(()=>{
        const UserDetails = async ()=>{
            const user = await getUserDetails()
            setUser(user?.user)
        }
        UserDetails()
    },[])


    if(pathname==="/signin" || pathname==="/signup"){
        return
    }

    
    return(
        <aside className="bg-gray-200 dark:bg-zinc-950 min-h-screen w-auto p-4 shadow-sm shadow-sky-500 min-w-[360px]">
            <div className=" border-b border-sky-800 px-2 py-4 flex justify-between items-center">
                <p className="text-xl text-sky-700">{t("title")}</p>
                <div className="flex gap-4">
                    <ThemeSwitcher customCSS="shadow-none text-sky-700"/>
                    <LanguageSwitcher customCSS="shadow-none text-sky-700"/>
                </div>
            </div>

            <div className="flex gap-4 p-4 border-b border-sky-600">
                <div className="p-4 rounded-full bg-white dark:bg-sky-600 text-sky-600 dark:text-white shadow w-12 h-12 flex justify-center items-center text-xl font-bold">
                    {user?.name[0]?.toUpperCase()}
                </div>
                <div>
                    
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </div>
                
            </div>



            <div className="flex flex-col w-full h-auto justify-start items-center mt-8 gap-8">
                <IntLink className={`w-full p-4 rounded-lg hover:bg-sky-700/30 transition-all duration-400 text-xl ${pathname==="/"?"bg-sky-700/30":"bg-transparent"}`} href={'/'}>
                    {t("tasks")}
                </IntLink>


                
                <IntLink className={`w-full p-4 rounded-lg hover:bg-sky-700/30 transition-all duration-400 text-xl ${pathname==="/new-task"?"bg-sky-700/30":"bg-transparent"}`} href={'/new-task'}>
                    {t("newTask")}
                </IntLink>


                <IntLink className={`w-full p-4 rounded-lg hover:bg-sky-700/30 transition-all duration-400 text-xl ${pathname==="/user-tasks"?"bg-sky-700/30":"bg-transparent"}`} href={'/user-tasks'}>
                    {t("currentTask")}
                </IntLink>

            </div>
        </aside>
    )
}