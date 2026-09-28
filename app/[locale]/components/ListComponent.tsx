"use client";

import { useDroppable } from "@dnd-kit/react";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import deleteListAction from "@/app/actions/deleteList";
import { useTranslations } from "next-intl";
import { CiLock } from "react-icons/ci";
import useLists from "../Store/lists-store";
import { useActionState } from "react";
import addTaskAction from "@/app/actions/addTaskAction";
import useTasks from "../Store/tasks-store";
import { ListType } from "../types/listType";

export default function ListComponent({
  list,
  children,
}: {
  list: ListType;
  children: React.ReactNode;
}) {
  const t = useTranslations("home");
  const { ref } = useDroppable({ id: list?.id });
  const removeList = useLists((state) => state.removeList);
  const addTask = useTasks((state) => state.addTask);
  const [isAddTask, setIsAddTask] = useState<boolean>(false);

  const deleteHandler = async ({ id }: { id: string }) => {
    const confirmBox = confirm(t("confirmDeleting"));
    if (!confirmBox) return;

    const result = await deleteListAction({ listId: id });
    if (!result.success && result.message === "NOT_OWNER") {
      alert(t(`${result.message}`));
    } else {
      removeList(id);
    }
  };

  const [state, actionForm] = useActionState(
    addTaskAction.bind(null, list.id),
    { success: false, message: "" },
  );

  useEffect(() => {
    const addTaskToList = () => {
      if (state.success && "task"in state && state?.task) {
        addTask(state?.task);
        setIsAddTask(false);
      }
    };
    addTaskToList();
  }, [state]);

  return (
    <div className="flex h-max min-w-[18rem] flex-col gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
          {list?.name}
        </p>

        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {list?._count?.Tasks}
          </p>

          {list.isPrivate && (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <CiLock />
            </p>
          )}

          <button
            onClick={() => {
              deleteHandler({ id: list.id });
            }}
            className="text-red-500 transition-transform duration-150 hover:scale-110"
          >
            <MdDeleteOutline size={18} />
          </button>
        </div>
      </div>

      <div
        className="flex max-h-96 min-h-10 w-full flex-col gap-3 overflow-y-auto"
        ref={ref}
      >
        {children}
      </div>

      <div>
        {isAddTask ? (
          <form
            action={actionForm}
            className="flex w-full flex-col items-start justify-center gap-3"
          >
            <input
              type="text"
              name="title"
              className="w-full rounded-lg border border-slate-200 bg-white p-2 px-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="flex items-center gap-1 rounded-lg bg-sky-700 px-3 py-2 text-sm text-white transition-colors duration-200 hover:bg-sky-800"
                onClick={() => {
                  setIsAddTask(true);
                }}
              >
                <GoPlus size={18} />
                {t("addTask.addBtn")}
              </button>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => {
                  setIsAddTask(false);
                }}
              >
                <IoMdClose size={20} />
              </button>
            </div>
          </form>
        ) : (
          <div
            onClick={() => {
              setIsAddTask(true);
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-sm text-slate-700 transition-colors duration-200 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <GoPlus size={18} />
            <button>{t("addTask.addBtn")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
