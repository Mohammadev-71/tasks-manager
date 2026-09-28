'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function signout(){
    const signout = await auth.api.signOut({
        headers:await headers()
    })
    if(!signout.success){
        return({
            success:false,
            message:"something went wrong please try again "
        })
    }

    return({
        success:true,
        message:"SIGNOUT"
    })
}