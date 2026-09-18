'use client'

import { useTranslations } from "next-intl"
import LanguageSwitcher from "../components/LanguageSwitcher"
import ThemeSwitcher from "../components/ThemeSwitcher"
import PasswordField from "../components/PasswordField"
import { useActionState, useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import { redirect } from "next/navigation"
import signinAction from "@/app/actions/signinAction"
import { Link as IntLink } from "@/i18n/navigation"



const initialState = {
    success: false,
    message: "",
};


type ActionResponse = {
    message?: {
        message: string;
        path: string[];
    }[];
};


export default function Signin(){
    const t = useTranslations("signin")
    const [state, formAction, isPending] = useActionState(signinAction, initialState);    
    const [data, setData] = useState({email:"",password:""})

    if(state.success){
        redirect('/')
    }


return(
        <main className="flex justify-center items-center w-screen h-screen p-4">

            <div className="flex flex-col justify-start items-center text-sky-500 dark:text-sky-400 shadow-sm shadow-sky-600 rounded-lg p-4 gap-4 max-w-[400px]">

                <div className="flex w-full gap-4 m-2 justify-between">
                    <LanguageSwitcher customCSS="shadow-none"/>
                    <ThemeSwitcher customCSS="shadow-none"/>
                </div>


                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-2xl">{t("title")}</h1>
                    <h2 className="text-xl">{t("subtitle")}</h2>
                </div>
                

                <form className="w-full flex flex-col gap-6 " action={formAction}>


                    <input defaultValue={data.email} onChange={(e)=>{setData({...data, email:e.target.value})}} placeholder={t("placeholder.email")} className="shadow-sm shadow-sky-400 w-full p-2.5 rounded-lg text-sky-500 dark:text-sky-400 outline-none"  name="email" type="email" />
                    

                    {
                        !state.success &&(
                            <ErrorMessage intl="signup" isHidden={(state as ActionResponse)?.message?.[0]?.path?.[0] === "email"} error={`error.${(state as ActionResponse)?.message?.[0]}`} field="Email"/>
                        )
                    }
                                    

                    <PasswordField />

                    {
                        !state.success &&(
                            <ErrorMessage intl="signup" isHidden={(state as ActionResponse)?.message?.[0]?.path?.[0] === "password"} error={`error.${(state as ActionResponse)?.message?.[0]}`} field="Password"/>
                        )
                    }

                    <div className="w-full flex flex-col justify-center items-center">
                        <p>{t("haveAccount")}</p>
                        <IntLink href={"/signup"}>
                            {t("signinLink")}
                        </IntLink>
                    </div>
                    
                    <button className="m-4 p-2 shadow-sm shadow-sky-400 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-800 hover:text-sky-600 dark:hover:text-sky-100 cursor-pointer transition-all duration-300 hover:scale-105">
                        {t("subtitle")}
                    </button>
                </form>


            </div>
        </main>
    )
}