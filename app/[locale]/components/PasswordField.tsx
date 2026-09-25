'use client'

import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function PasswordField({customCSS}:{customCSS?:string}){
    const [showPassword, setShowPassword] = useState(false)
    const t = useTranslations("signup")
    return(
        <div className="w-full rounded-full border border-sky-700 dark:border-sky-500 text-sky-700 dark:text-sky-500  outline-none flex justify-between items-center px-4" >
            <input placeholder={t("placeholder.password")}  className="w-full p-4 text-sky-700 dark:text-sky-500  outline-none"  name="password" type={showPassword?"text":"password"} />
            <button onClick={()=>{setShowPassword(!showPassword)}} type="button">{showPassword?<FaRegEye size={20}/>:<FaRegEyeSlash size={20}/>}</button>
        </div>
    )
}