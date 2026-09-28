"use server";

import { prisma } from "@/lib/prisma";
import { TaskType } from "../[locale]/types/taskType";
import authentication from "./authentication";

export type EditTaskActionResult =
  | { success: true; task: TaskType }
  | { success: false; message: string };

export default async function editTaskAction(
  taskId: string,
  prevState: any,
  formData: FormData,
): Promise<EditTaskActionResult> {
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
          include: {
            author: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      task: result as TaskType,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
}
