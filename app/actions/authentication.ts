
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function authentication(){
    const session = await auth.api.getSession({
            headers: await headers()
        })
    
        if(!session|| !session.user){
            return({
                success:false as const,
                message:"UNAUTHORIZED"
            })
        }
    return({
        success:true as const ,
        user:session.user
    })
}