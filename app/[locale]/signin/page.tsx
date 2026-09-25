"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import PasswordField from "../components/PasswordField";
import { useActionState, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { redirect } from "next/navigation";
import signinAction from "@/app/actions/signinAction";
import { Link as IntLink } from "@/i18n/navigation";

const initialState = {
  success: false,
  message: "",
};

type ActionResponse = {
  message?: {
    message: string;
    path: string[];
  }[];
};

export default function Signin() {
  const t = useTranslations("signin");
  const [state, formAction, isPending] = useActionState(
    signinAction,
    initialState,
  );
  const [data, setData] = useState({ email: "", password: "" });

  if (state.success) {
    redirect("/");
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center gap-0 bg-slate-100 p-8 dark:bg-slate-950 lg:gap-20">
      <div className="hidden h-full items-center justify-center md:flex md:w-1/2">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-50">
            Less chaos. More progress.
          </h1>
          <p className="mt-4 text-2xl text-slate-600 dark:text-slate-300">
            Organize your tasks, track your progress, and focus on what matters.
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col items-center justify-start gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex w-full justify-start gap-4 p-4 text-slate-700 dark:text-slate-300">
          <LanguageSwitcher customCSS="shadow-none" />
          <ThemeSwitcher customCSS="shadow-none" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-50">
            {t("title")}
          </h1>
          <h2 className="text-lg text-slate-600 dark:text-slate-300">
            {t("subtitle")}
          </h2>
        </div>

        <form
          className="mt-8 flex w-full flex-col gap-6 px-6"
          action={formAction}
        >
          <input
            defaultValue={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            placeholder={t("placeholder.email")}
            className="w-full rounded-full border border-slate-200 bg-slate-50 p-4 text-slate-700 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-sky-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            name="email"
            type="email"
          />

          {!state.success && (
            <ErrorMessage
              intl="signup"
              isHidden={
                (state as ActionResponse)?.message?.[0]?.path?.[0] === "email"
              }
              error={`error.${(state as ActionResponse)?.message?.[0]}`}
              field="Email"
            />
          )}

          <PasswordField />

          {!state.success && (
            <ErrorMessage
              intl="signup"
              isHidden={
                (state as ActionResponse)?.message?.[0]?.path?.[0] ===
                "password"
              }
              error={`error.${(state as ActionResponse)?.message?.[0]}`}
              field="Password"
            />
          )}

          <button className="m-4 rounded-full bg-sky-700 p-3 text-lg text-white transition-colors duration-200 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500">
            Signin
          </button>

          <div className="flex w-full items-center justify-center gap-2">
            <p className="text-slate-700 dark:text-slate-300">
              {t("haveAccount")}
            </p>
            <IntLink
              className="relative text-sky-700 transition-all duration-300 hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-lg after:bg-sky-700 after:transition-all after:duration-300 hover:after:w-full dark:text-sky-400 dark:after:bg-sky-400"
              href={"/signup"}
            >
              {t("signinLink")}
            </IntLink>
          </div>
        </form>
      </div>
    </main>
  );
}
