"use client";

import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import signout from "@/app/actions/signout";
import { redirect } from "next/navigation";

export default function PageHeader({ title }: { title: string }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const t = useTranslations("home");
  const signoutHandler = async () => {
    const result = await signout();
    if (result.success && result.message === "SIGNOUT") {
      redirect("/signin");
    }
  };

  return (
    <section className="absolute top-0 z-2 w-full flex justify-between items-center bg-slate-950/30  p-4 shadow-md border-b border-sky-700">
      <p className="text-xl text-gray-300">{title}</p>

      <div className="relative">
        <div
          onClick={() => {
            setShowDetails(!showDetails);
          }}
          className="flex justify-center items-center w-12 h-12 text-2xl  bg-sky-600 rounded-full text-white"
        >
          {user?.name[0].toUpperCase()}
        </div>

        {showDetails && (
          <div className="absolute end-0 flex flex-col gap-4 justify-end items-end bg-white dark:bg-neutral-800 shadow-lg p-4 rounded-lg text-gray-800 dark:text-gray-300 ">
            <p>{user?.name}</p>
            <p>{user?.email}</p>

            <div className="flex items-center gap-4">
              <LanguageSwitcher customCSS="shadow-none" />
              <ThemeSwitcher customCSS="shadow-none" />
            </div>

            <button
              onClick={() => {
                signoutHandler();
              }}
              className="p-2 w-full    border border-slate-300 rounded-lg cursor-pointer hover:scale-102 transition-all duration-200"
            >
              {t("logoutBtn")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
