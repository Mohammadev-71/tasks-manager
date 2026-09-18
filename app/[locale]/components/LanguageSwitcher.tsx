'use client'

import { Link as LinkInt, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { IoLanguageOutline } from "react-icons/io5";



export default function LanguageSwitcher({customCSS}:{customCSS?:string}){
    const locale = useLocale()
    const pathName = usePathname()
    const nextLocale = locale==="en"?"ar":"en"
    return(
        <LinkInt className={`${customCSS?customCSS:"text-sky-600 p-2.5 rounded-lg shadow-sm shadow-sky-600"}`} href={pathName} locale={nextLocale}>
            <IoLanguageOutline size={25}/>
        </LinkInt>
    )
}