'use server'

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";


export default async function deleteTaskAction({taskId}:{taskId:string}){
    
    const auth = await authentication()

    if(!auth.success){
        return(auth)
    }

    try {
        const result  = await prisma.task.deleteMany({
            where:{
                id:taskId,
                creatorId:auth?.user?.id
            }
        })

        if(result.count===0){
            return({
                success:false,
                message:"NOT_OWNER"
            })
        }
        


        return({
            success:true,
            message:"DELETED"
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong please try again"
        })
    }
}