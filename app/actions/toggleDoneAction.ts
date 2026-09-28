'use server'

import { prisma } from "@/lib/prisma";
import { TaskType } from "../[locale]/types/taskType";
import authentication from "./authentication";

export type ToggleDoneActionResult =
  | { success: true; task: TaskType }
  | { success: false; message: string };

export default async function toggleDoneAction({ taskId, isDone }: { taskId: string; isDone: boolean }): Promise<ToggleDoneActionResult> {
  const auth = await authentication();

  if (!auth.success) {
    return auth;
  }

  try {
    const result = await prisma.task.update({
      where: { id: taskId },
      data: {
        isDone: !isDone,
      },
      include: {
        creator: true,
        Comments: true,
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
      message: "Something went wrong please try again",
    };
  }
}