'use server'

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";


export default async function toggleDoneAction({taskId,isDone}:{taskId:string,isDone:boolean}){
    const auth = await authentication()

    if(!auth.success){
        return(auth)
    }

    try {
        const result = await prisma.task.update({
            where:{id:taskId},
            data:{
                isDone:!isDone
            },
            include:{
                creator:true,
                Comments:true
            }
        })

        return({
            success:true,
            task:result
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"Something went wrong please try again"
        })
    }
}