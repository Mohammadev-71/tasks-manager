'use server'
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function getTaskDetails({taskId}:{taskId:string}){

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        

        const userId = session?.user.id

        if(!userId || !session){
            return({
                success:false,
                message:"UNAUTHORIZED"
            })
        }
        const task = await prisma.task.findUnique({
            where:{id:taskId},
            include:{
                mentionedUsers:true,
                creator:true,
                solutions:{
                    include:{
                        author:true
                    }
                }
            },
        })

        return({
            success:true,
            task:task
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong, pleas try again"
        })
    }
    
}