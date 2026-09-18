'use server'


import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addSolveValidation} from "@/lib/utils/validations";
import { TaskStatus } from "@/src/generated/prisma/enums";
import { headers } from "next/headers";


export default async function addSolve({title,description,taskId,status}:{title:string,description:string,taskId:string, status:string}){



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

        const validationResult = addSolveValidation.safeParse({
            title:title,
            description:description,
            authorId:user.id,
            taskId:taskId,
            status:status
        })


        if(!validationResult.success){
            return({
                success:false,
                message:validationResult.error.issues
            })
        }


        const newSolve = await prisma.task.update({
            where:{id:taskId},
            data:{
                status:status as TaskStatus,
                solutions:{
                    create:{
                        title:title,
                        description:description,
                        authorId:user.id,
                    }
                }

            }
        })
        

        return({
            success:true,
            solve:newSolve
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong pleas try again"
        })
    }
    
    

}