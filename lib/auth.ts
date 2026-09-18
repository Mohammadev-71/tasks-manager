import { betterAuth } from "better-auth"
import { prismaAdapter } from "@better-auth/prisma-adapter"
import {prisma} from './prisma'
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
    emailAndPassword:{
        enabled:true
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    advanced: {
        database: {
            joins: true,
        },
    },
    plugins:[
        nextCookies(),
    ]
})