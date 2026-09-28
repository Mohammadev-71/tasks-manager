"use server";
import { prisma } from "@/lib/prisma";
import { addListValidation } from "@/lib/utils/validations";
import authentication from "./authentication";

export default async function addListAction(
  prevState: any,
  formData: FormData,
) {
  const auth = await authentication();

  if (!auth.success) {
    return auth;
  }

  const listName = formData.get("list-name");
  const isPrivate = formData.get("is-private") === "on";

  const validationResult = addListValidation.safeParse({
    name: listName,
    isPrivate: isPrivate,
  });

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult?.error?.issues,
    };
  }

  try {
    const newList = await prisma.list.create({
      data: {
        name: listName as string,
        isPrivate: isPrivate,
        creatorId: auth?.user?.id as string,
      },
    });

    return {
      success: true,
      list: newList,
    };
  } catch (error:any) {
    console.log(error);
    if (error?.code === "P2002") {
      return {
        success: false,
        message: "ALREADY_CREATED",
      };
    }
    return {
      success: false,
      message: "Something want wrong please try again",
    };
  }
}
