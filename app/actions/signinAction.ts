'use server'
import { auth } from "@/lib/auth";
import { signinValidation } from "@/lib/utils/validations";


export default async function signinAction(prevState: any, formData: FormData){
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const validationResult = signinValidation.safeParse({email:email,password:password})

        if(!validationResult.success){
            return({
                success:false,
                message:validationResult.error.issues
            })
        }
        
        const signin =  await auth.api.signInEmail({
            body:{
                email:email as string,
                password:password as string
            }
        })


        return({
            success:true,
            message:"login successfully"
        })


    } catch (error) {
        console.log(error)

        return({
            success:false,
            message:error
        })
    }

}