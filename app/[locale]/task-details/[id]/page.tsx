import getTaskDetails from "@/app/actions/getTaskDetails";
import PageHeader from "../../components/PageHeader";
import TaskDetailsForm from "../../components/TaskDetailsForm";
import { getTranslations } from "next-intl/server";

export default async function TaskDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskDetails({ taskId: id });
  if(!("task" in task)){
    return
  }
  if (!task?.task) {
    return;
  }
  const t = await getTranslations("taskDetails");
  return (
    <main className="w-full h-full min-h-screen bg-linear-to-r from-sky-950 to-slate-800 pt-20 relative">
      <PageHeader title={`${t("pageTitle")} : [ ${task?.task?.title} ] `} />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <TaskDetailsForm taskDetails={task?.task} />
      </div>
    </main>
  );
}
