'use server'
import { auth } from "@/lib/auth";
import { signupValidation } from "@/lib/utils/validations";


export default async function signupAction(prevState: any, formData: FormData){
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const validationResult = signupValidation.safeParse({name:name,email:email,password:password})

        if(!validationResult.success){
            return({
                success:false,
                message:validationResult.error.issues
            })
        }
        
        const signup =  await auth.api.signUpEmail({
            body:{
                name:name as string,
                email:email as string,
                password:password as string,
                callbackURL:"/"
            },
            
        })

        return({
            success:true,
            message:"login successfully",
        })

    } catch (error) {
        console.log(error)

        if(error?.status==="UNPROCESSABLE_ENTITY"){

            return({
                success:false,
                message:"UNPROCESSABLE_ENTITY"
            })

        }

        
        return({
            success:false,
            message:"something went wrong pleas try again"
        })
    }

}