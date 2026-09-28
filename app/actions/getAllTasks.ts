"use server";

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";

export default async function getAllTasks() {
  const auth = await authentication();

  if (!auth.success) {
    return auth;
  }
  try {
    const tasks = await prisma.task.findMany({
      include: {
        Comments: {
          include: {
            author:{
              select:{
                name:true,
                email:true,
              }
            },
          },
        },
      },
    });

    if (!tasks) {
      return {
        success: false,
        message: "tasks Not Found",
      };
    }

    return {
      success: true,
      tasks: tasks,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong, please try again",
    };
  }
}
