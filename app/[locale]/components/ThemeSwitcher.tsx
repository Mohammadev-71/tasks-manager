'use client'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeSwitcher({customCSS}:{customCSS?:string}){
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    const nextTheme = theme==="dark"?"light":"dark"
    const correctIcon = theme==="light"?<MdDarkMode size={25}/>:<MdOutlineLightMode size={25}/>
    
    
    useEffect(() => {
        setMounted(true)
    }, [])

    
    if (!mounted) {
        return <div className={`${customCSS ? customCSS : "text-sky-600 p-2.5 rounded-lg shadow-sm shadow-sky-600 min-w-11 min-h-11"}`} />
    }


    return(
        <div onClick={()=>{setTheme(nextTheme)}} className={`${customCSS?customCSS:"text-sky-600 p-2.5 rounded-lg shadow-sm shadow-sky-600"}`}>{correctIcon}</div>
    )
}