'use server'
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function getUserTasks(){

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
        const tasks = await prisma.task.findMany({
            where:{mentionedUsers:{
                some:{
                    id:userId
                }
            }},
            orderBy: {
                createdAt: "desc",
            },
            include:{
                mentionedUsers:true,
                creator:true
            }
        })

        return({
            success:true,
            tasks:tasks
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong, pleas try again"
        })
    }
    
}