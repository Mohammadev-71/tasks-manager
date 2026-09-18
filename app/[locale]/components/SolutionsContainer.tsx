import { useTranslations } from "next-intl"




export default function Solution({solution}:{solution:any}){
    const t = useTranslations("task")

    return(
        <div className="border-b border-sky-600 pb-8">
            <div className="mb-6 flex items-start justify-between gap-4">
                <h1 className="mt-3 text-xl font-bold text-slate-800 dark:text-slate-100 md:text-2xl">
                    {solution.title}
                </h1>
                                
            </div>

            <div className="grid gap-6 md:grid-cols-[1.4fr_0.8fr]">
                <section className="rounded-2xl bg-slate-50 p-5 dark:bg-zinc-900">
                    <h2 className="mb-3 text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {t("description")}
                    </h2>
                    <p className="whitespace-pre-line text-base leading-7 text-slate-700 dark:text-slate-200">
                        {solution.description }
                    </p>
                </section>

                <aside className="rounded-2xl border border-slate-200 p-5 dark:border-zinc-700">
                    <div className="space-y-4">
                        <div>
                            <p className="text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                {t("creator")}
                            </p>
                            <p className="mt-1 text-base font-medium text-slate-800 dark:text-slate-100 ">
                                {solution.author?.name || "Unknown"}
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                {t("createDate")}
                            </p>
                            <p className="mt-1 text-lg text-slate-600 dark:text-slate-300">
                                {solution.createdAt.toLocaleDateString()}
                            </p>
                        </div>

                        
                    </div>
                </aside>
            </div>
        </div>
    )
}