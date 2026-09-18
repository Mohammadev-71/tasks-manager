'use server'
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function getAllUser(){

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        

        const userId = session?.user.id

        if(!userId || !session){
            return({
                success:false,
                message:"pleas login"
            })
        }
        const users = await prisma.user.findMany({
            where:{id:{not:userId}}
        })

        return({
            success:true,
            users:users
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong, pleas try again"
        })
    }
    
}