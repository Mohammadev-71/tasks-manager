import { prisma } from "@/lib/prisma";
import authentication from "./authentication";



export default async function getTaskDetails({taskId}:{taskId:string}){

    const auth = await authentication()
    if(!auth.success){
        return(auth)
    }

    try {
        const taskDetails = await prisma.task.findUnique({
            where:{id:taskId},
            include:{
                Comments:{
                    include:{
                        author:true
                    }
                },
                creator:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            }
        })

        return({
            success:true,
            task:taskDetails
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"something went wrong please try again"
        })
    }
}