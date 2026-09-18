import { Link as IntLink } from "@/i18n/navigation";
import getTaskDetails from "@/app/actions/getTaskDetails";
import PageHeader from "../../components/PageHeader";
import { getTranslations } from "next-intl/server";
import SolveCard from "../../components/SolveCard";
import Solution from "../../components/SolutionsContainer";
import { redirect } from "next/navigation";
export default async function TaskDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const result = await getTaskDetails({ taskId: id });
    const task = result?.task;

    if((!result?.success && result?.message==="UNAUTHORIZED")){
        redirect("/signin")
    }
    const t = await getTranslations("task")
    if (!task) {
        return (
        <div className="flex w-full flex-col gap-6">
            <PageHeader title="Task Details" />

            <div className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
            <p className="mb-4 text-lg text-slate-600 dark:text-slate-300">
                {t("notFound")}
            </p>
            <IntLink
                href="/"
                className="inline-flex rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
                {t("backBtn")}
            </IntLink>
            </div>
        </div>
        );
    }

    const createdAt = new Date(task.createdAt).toLocaleDateString();
    const updatedAt = new Date(task.updatedAt).toLocaleDateString();

    return (
        <div className="flex w-full flex-col gap-6 pb-20">
        <PageHeader title={t("pageTitle")} />

            <div className="mx-auto w-full px-4 pb-8 md:px-6 ">
                <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                    <span className={`rounded-full ${task.status==="PENDING"?"bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300":task.status==="IN_PROGRESS"?"bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300":"bg-sky-200 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"} px-2 py-1 font-medium text-lg`}>
                    {t(task.status)}
                    </span>
                    <h1 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
                        {task.title}
                    </h1>
                    </div>
                    <IntLink
                        href="/"
                        className="rounded-full border border-slate-200 px-8 py-2 text-lg font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-zinc-700 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-400"
                        >
                        {t("backBtn")}
                    </IntLink>
                    
                </div>

                <div className="grid gap-6 md:grid-cols-[1.4fr_0.8fr]">
                    <section className="rounded-2xl bg-slate-50 p-5 dark:bg-zinc-900">
                    <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {t("description")}
                    </h2>
                    <p className="whitespace-pre-line text-base leading-7 text-slate-700 dark:text-slate-200">
                        {task.description || t("noDescription")}
                    </p>
                    </section>

                    <aside className="rounded-2xl border border-slate-200 p-5 dark:border-zinc-700">
                    <div className="space-y-4">
                        <div>
                        <p className="text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {t("creator")}
                        </p>
                        <p className="mt-1 text-base font-medium text-slate-800 dark:text-slate-100">
                            {task.creator?.name || "Unknown"}
                        </p>
                        </div>

                        <div>
                        <p className="text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {t("createDate")}
                        </p>
                        <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">
                            {createdAt}
                        </p>
                        </div>

                        <div>
                        <p className="text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {t("updateDate")}
                        </p>
                        <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">
                            {updatedAt}
                        </p>
                        </div>
                    </div>
                    </aside>
                </div>

                <div className="mt-8">
                    <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t("mentioned")}
                    </h2>

                    {task.mentionedUsers?.length ? (
                    <ul className="flex flex-wrap gap-2">
                        {task.mentionedUsers.map(
                        (user: { id: string; name?: string | null }) => (
                            <li
                            key={user.id}
                            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-lg text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300"
                            >
                            {user.name || "Unknown user"}
                            </li>
                        ),
                        )}
                    </ul>
                    ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t("noMentioned")}
                    </p>
                    )}
                </div>
                </div>
            </div>

            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8 m-4">   
                <h1 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
                    {t("addSolve")}
                </h1>

                <SolveCard taskId={task.id}/>
            </div>


            <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8 m-4">  
                <div className="flex justify-between items-center border-b border-sky-600 pb-4">
                    <h1 className="mt-3 text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
                        {t("solutions")}
                    </h1>


                    <span className={`rounded-full "bg-sky-200 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 px-4 py-1 font-medium text-lg min-w-20 `}>{t("solutions")}: {task.solutions.length}</span>
                </div>
                {
                    task.solutions.map((solution)=>(
                        <Solution key={solution.id} solution={solution}/>
                    ))
                }
            </div>
        </div>
    );
}
