'use server'


import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addTaskValidation } from "@/lib/utils/validations";
import { headers } from "next/headers";


export default async function addTask({title,description,mentionedTo}:{title:string,description:string,mentionedTo:string[]}){



    try {
        const session = await auth.api.getSession({
            headers:await headers()
        })

        const user = session?.user


        if(!session || !user){
            return({
                success:false,
                message:"signin to continue"
            })
        }

        const validationResult = addTaskValidation.safeParse({
            title:title,
            description:description,
            creatorId:user.id,
            mentionedUsers:mentionedTo
        })


        if(!validationResult.success){
            return({
                success:false,
                message:validationResult.error.issues
            })
        }


        const newTask  = await prisma.task.create({
            data:{
                title:title,
                description:description,
                creatorId:user.id,
                mentionedUsers: {
                    connect: mentionedTo.map((id) => ({ id })),
                },
            }
        })

        return({
            success:true,
            message:"task added successfully"
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong pleas try again"
        })
    }
    
    

}