"use server";
import { auth } from "@/lib/auth";
import { signinValidation } from "@/lib/utils/validations";

export default async function signinAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const validationResult = signinValidation.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.issues,
      };
    }

    await auth.api.signInEmail({
      body: {
        email: email as string,
        password: password as string,
      },
    });

    return {
      success: true,
      message: "login successfully",
    };
  } catch (error: any) {
    const message =
      error?.message ??
      error?.status ??
      "something went wrong, please try again";

    if (
      message === "Invalid email or password" ||
      error?.status === "INVALID_EMAIL_OR_PASSWORD"
    ) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return {
      success: false,
      message,
    };
  }
}
