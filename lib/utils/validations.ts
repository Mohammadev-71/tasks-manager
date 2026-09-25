import * as z from 'zod';


export const signupValidation = z.object({
    name:z.string().min(1,"EMPTY").max(50,"TOO_LONG"),
    email: z.email("EMAIL"),
    password:z.string().min(8,"EMPTY").max(32,"TOO_LONG").regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&_-]{8,}$/,"PASSWORD_INVALID")
})

export const signinValidation = z.object({
    email: z.email("EMAIL"),
    password:z.string().min(8,"EMPTY").max(32,"TOO_LONG").regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&_-]{8,}$/,"PASSWORD_INVALID")
})


export const addListValidation = z.object({
    name:z.string("STRING").min(1,"EMPTY").max(100,"TOO_LONG"),
    isPrivate:z.boolean("BOOLEAN")
})

export const addTaskValidation = z.object({
    title:z.string("STRING").min(1,"EMPTY").max(100,"TOO_LONG"),
    creatorId:z.string("STRING").min(1,"EMPTY"),
    listId:z.string("STRING").min(1,"EMPTY")
})


// export const addTaskValidation = z.object({
//     title:z.string("STRING").min(1,"EMPTY"),
//     description:z.string("STRING").min(1,"EMPTY"),
//     creatorId:z.string("STRING").min(1,"EMPTY"),
//     mentionedUsers:z.array(z.string()).min(1, "EMPTY")
// })


// export const addSolveValidation = z.object({
//     title:z.string("STRING").min(1,"EMPTY"),
//     description:z.string("STRING").min(1,"EMPTY"),
//     taskId:z.string("STRING").min(1,"EMPTY"),
//     authorId:z.string("STRING").min(1,"EMPTY"),
//     status:z.enum(['COMPLETED','IN_PROGRESS','PENDING'],"EMPTY")
// })



