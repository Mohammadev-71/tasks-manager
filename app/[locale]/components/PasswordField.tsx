'use client'

import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function PasswordField({customCSS}:{customCSS?:string}){
    const [showPassword, setShowPassword] = useState(false)
    const t = useTranslations("signup")
    return(
        <div className="shadow-sm shadow-sky-500 dark:shadow-sky-400 w-full rounded-lg text-sky-400 outline-none flex justify-between items-center px-4" >
            <input placeholder={t("placeholder.password")} className=" p-2.5 rounded-lg text-sky-500 dark:text-sky-400 outline-none" name="password" type={showPassword?"text":"password"} />
            <button onClick={()=>{setShowPassword(!showPassword)}} type="button">{showPassword?<FaRegEye size={20}/>:<FaRegEyeSlash size={20}/>}</button>
        </div>
    )
}