'use server'

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";



export default async function getAllLists (){
    const auth = await authentication()

    if(!auth.success){
        return(auth)
    }
    try {
        const lists = await prisma.list.findMany({
            where:{
                OR:[
                    {isPrivate:false},
                    {creatorId:auth?.user?.id}
                ]
            },
            include:{
                _count:{
                    select:{
                        Tasks:true
                    }
                },
                creator:{
                    select:{
                        name:true
                    }
                }
            }
        })

        if(!lists){
            return({
                success:false,
                message:"Lists Not Found"
            })
        }

        return({
            success:true,
            lists:lists
        })
    } catch (error) {
        console.log(error)
        return({
            success:false,
            message:"Something went wrong, please try again"
        })
    }
}