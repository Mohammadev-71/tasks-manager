export default function LoadingLists() {
  const mockLists = [1, 2, 3];
  return mockLists.map((list) => (
    <div
      key={list}
      className="flex h-max flex-col gap-4 rounded-xl border border-slate-200 bg-slate-100 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="relative min-h-6 w-64 overflow-hidden rounded-full bg-slate-200 after:absolute after:h-10 after:w-full after:-rotate-45 after:bg-slate-300 after:content-[''] after:animate-loading after:blur-xl dark:bg-slate-800 dark:after:bg-slate-700"></div>

      <div className="flex min-h-10 w-full flex-col gap-4">
        <div className="relative min-h-14 w-64 overflow-hidden rounded-full bg-slate-200 after:absolute after:h-10 after:w-full after:-rotate-45 after:bg-slate-300 after:content-[''] after:animate-loading after:blur-xl dark:bg-slate-800 dark:after:bg-slate-700"></div>
        <div className="relative min-h-14 w-64 overflow-hidden rounded-full bg-slate-200 after:absolute after:h-10 after:w-full after:-rotate-45 after:bg-slate-300 after:content-[''] after:animate-loading after:blur-xl dark:bg-slate-800 dark:after:bg-slate-700"></div>
        <div className="relative min-h-14 w-64 overflow-hidden rounded-full bg-slate-200 after:absolute after:h-10 after:w-full after:-rotate-45 after:bg-slate-300 after:content-[''] after:animate-loading after:blur-xl dark:bg-slate-800 dark:after:bg-slate-700"></div>
        <div className="relative min-h-14 w-64 overflow-hidden rounded-full bg-slate-200 after:absolute after:h-10 after:w-full after:-rotate-45 after:bg-slate-300 after:content-[''] after:animate-loading after:blur-xl dark:bg-slate-800 dark:after:bg-slate-700"></div>
      </div>
    </div>
  ));
}
