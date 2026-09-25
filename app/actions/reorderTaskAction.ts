'use server'

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";


export default async function reorderTaskAction({taskId,listId}:{taskId:string,listId:string}){
    const auth = await authentication()
    
    if(!auth.success){
        return(auth)
    }
    
    try {
        const result = await prisma.task.update({
            where:{id:taskId},
            data:{
                listId:listId
            }
        })

        return({
            success:true,
            message:result
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"Something went wrong please try again"
        })
    }
}