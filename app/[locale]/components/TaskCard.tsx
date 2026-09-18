import { Link as IntLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
export default function TaskCard({ task }: { task: any }) {
    const t = useTranslations("task")
    if (!task) return null;

    const createdAt = task?.createdAt
        ? new Date(task.createdAt).toLocaleDateString()
        : "No date";

    const membersCount = task?.mentionedUsers?.length ?? 0;

    return (
        <article
        key={task.id}
        className="w-full max-w-sm rounded-2xl border border-sky-100 bg-gray-100 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
        >
        <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-400 line-clamp-1">
            {task.title}
            </h3>
            <span className={`rounded-full ${task.status==="PENDING"?"bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300":task.status==="IN_PROGRESS"?"bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300":"bg-sky-200 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"} px-2 py-1 font-medium text-sm`}>
            {t(`${task.status}`)}
            </span>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {task.description}
        </p>

        <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="text-sm">
            {membersCount > 0
                ? `${membersCount} ${t("members")}`
                : "No members"}
            </span>
            <span className="text-sm">{createdAt}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-3 dark:border-zinc-700">
            <span className="text-sm text-slate-500 dark:text-slate-400">
            {t("by")} {task?.creator?.name || "Unknown"}
            </span>

            <IntLink
            href={`/task-details/${task.id}`}
            className="text-lg font-medium text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
            {t("open")}
            </IntLink>
        </div>
        </article>
    );
}
