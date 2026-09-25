import { GoPlus } from "react-icons/go";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

export default function AddListButton({ setIsAddList }: { setIsAddList: Dispatch<SetStateAction<boolean>> }) {
  const t = useTranslations("home");
  return (
    <div
      onClick={() => {
        setIsAddList(true);
      }}
      className="flex min-w-40 cursor-pointer items-center gap-2 rounded-lg border border-sky-200 bg-sky-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-800"
    >
      <GoPlus size={18} />
      <button>{t("addTask.addBtn")}</button>
    </div>
  );
}
