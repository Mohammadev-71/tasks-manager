"use client";
import ListComponent from "./components/ListComponent";
import PageHeader from "./components/PageHeader";
import { DragDropProvider } from "@dnd-kit/react";
import TaskComponent from "./components/TaskComponent";
import { useEffect, useState } from "react";
import getAllLists from "../actions/getAllLists";
import useLists from "./Store/lists-store";
import useTasks from "./Store/tasks-store";
import getAllTasks from "../actions/getAllTasks";
import { useTranslations } from "next-intl";
import AddListFrom from "./components/AddListForm";
import AddListButton from "./components/AddListButton";
import LoadingLists from "./components/loadingLists";
import reorderTaskAction from "../actions/reorderTaskAction";

export default function Home() {
  const setLists = useLists((state) => state.setLists);
  const setTasks = useTasks((state) => state.setTask);
  const lists = useLists((state) => state.lists);
  const tasks = useTasks((state) => state.tasks);
  const [isAddList, setIsAddList] = useState<boolean>(false);
  const t = useTranslations("home");
  const reorderTask = useTasks((state) => state.reorderTask);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getListsAndTasks = async () => {
      try {
        setIsLoading(true);
        const listsResult = await getAllLists();
        const tasksResult = await getAllTasks();
        if (!listsResult.success || !tasksResult.success) {
          return;
        }

        if ("lists" in listsResult && "tasks" in tasksResult) {
          setLists(listsResult.lists);
          setTasks(tasksResult.tasks);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getListsAndTasks();
  }, []);

  const reorderTaskHandler = async (taskId: string, listId: string) => {
    const result = await reorderTaskAction({ taskId, listId });
    if (!result.success) {
    }
  };

  return (
    <main className="w-full h-full min-h-screen bg-gradient-to-r from-sky-950 to-slate-800 pt-20 relative">
      <PageHeader title={t("pageTitle")} />

      <div className=" max-w-max m-8">
        {isAddList ? (
          <AddListFrom setIsAddList={setIsAddList} />
        ) : (
          <AddListButton setIsAddList={setIsAddList} />
        )}
      </div>

      <DragDropProvider
        onDragEnd={(e) => {
          if (e.canceled) return;
          const taskId = e.operation.source?.id;
          const listId = e.operation.target?.id;
          if (typeof taskId === "string" && typeof listId === "string") {
            reorderTask(taskId, listId);
            reorderTaskHandler(taskId, listId);
          }
        }}
      >
        <div className="w-full h-full min-h-screen flex flex-col md:flex-row gap-8 p-10 overflow-hidden md:overflow-scroll justify-start items-center md:items-start">
          {isLoading ? (
            <LoadingLists />
          ) : (
            lists?.map((list) => (
              <ListComponent key={list.id} list={list}>
                {tasks?.map((task) => {
                  if (task.listId !== list.id) return null;

                  return <TaskComponent key={task.id} task={task} />;
                })}
              </ListComponent>
            ))
          )}
        </div>
      </DragDropProvider>
    </main>
  );
}
