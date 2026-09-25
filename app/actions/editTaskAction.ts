"use server";

import { prisma } from "@/lib/prisma";
import authentication from "./authentication";

export default async function editTaskAction(
  taskId: string,
  prevState: any,
  formData: FormData,
) {
  const auth = await authentication();

  if (!auth.success) {
    return auth;
  }
  const title = formData.get("title");
  const description = formData.get("description");
  const comment = formData.get("comment");
  try {
    const result = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: title as string,
        description: description as string,
        ...(comment
          ? {
              Comments: {
                create: {
                  description: comment as string,
                  authorId: auth?.user?.id as string,
                },
              },
            }
          : {}),
      },
      include: {
        creator: true,
        Comments: {
          include:{
            author:true
          }
        },
      },
    });

    return {
      success: true,
      task: result,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
}
