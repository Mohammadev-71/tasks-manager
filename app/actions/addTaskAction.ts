'use server'

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";
import { addTaskValidation } from "@/lib/utils/validations";



export default async function addTaskAction(listId:string,prevState: any, formData: FormData){
    const auth = await authentication()
    if(!auth.success){
        return(auth)
    }

    const title = formData.get("title")

    const validationResult = addTaskValidation.safeParse({title:title,creatorId:auth?.user?.id,listId:listId})

    if(!validationResult.success){
        return({
            success:false,
            message:validationResult.error.issues
        })
    }

    try {
        const newTask = await prisma.task.create({
            data:{
                title:title as string,
                creatorId:auth?.user?.id as string,
                listId:listId
            }
        })

        return({
            success:true,
            task:newTask
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong, please try again "
        })
    }

}