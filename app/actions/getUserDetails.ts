'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function getUserDetails(){


    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userDetails = session?.user

    return({
        user:userDetails
    })
}