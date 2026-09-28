import { prisma } from "@/lib/prisma";
import authentication from "./authentication";
import { TaskType } from "../[locale]/types/taskType";
export type GetTaskDetailsResult =
  | { success: true; task: TaskType | null }
  | { success: false; message: string };

export default async function getTaskDetails({
  taskId,
}: {
  taskId: string;
}): Promise<GetTaskDetailsResult> {
  const auth = await authentication();
  if (!auth.success) {
    return auth;
  }

  try {
    const taskDetails = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        Comments: {
          include: {
            author: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      success: true,
      task: taskDetails as TaskType | null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
}
