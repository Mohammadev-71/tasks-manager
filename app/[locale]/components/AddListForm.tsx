"use client";
import { IoMdClose } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import useLists from "../Store/lists-store";
import addListAction from "@/app/actions/addListAction";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AddListFrom({
  setIsAddList,
}: {
  setIsAddList: Dispatch<SetStateAction<boolean>>;
}) {
  const actionResult = {
    success: false,
    message: "",
  };
  const addList = useLists((state) => state.addList);
  const t = useTranslations("home");
  const [state, formAction, isPending] = useActionState(
    addListAction,
    actionResult,
  );


  useEffect(() => {
    if (state.success && state?.list) {
      addList(state?.list);
      setIsAddList(false)
    }
  }, [state]);


  return (
    <form
      action={formAction}
      className="flex min-w-80 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <input
        name="list-name"
        placeholder={t("addList.placeholder")}
        type="text"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      />



      <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
        {t("addList.isPrivate")}
        <input name="is-private" className="size-4" type="checkbox" />
      </label>



      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-sky-700 px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-sky-800"
        >
          {isPending ? (
            <VscLoading size={18} className="animate-spin" />
          ) : (
            <>
              <GoPlus size={18} />
              {t("addTask.addBtn")}
            </>
          )}
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => {
            setIsAddList(false);
          }}
        >
          <IoMdClose size={20} />
        </button>
      </div>
    </form>
  );
}
