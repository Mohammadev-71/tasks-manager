import { useTranslations } from "next-intl";

export default function ErrorMessage({
  intl,
  isHidden,
  error,
  field,
}: {
  intl: string;
  isHidden: boolean;
  error: string;
  field: string;
}) {
  const t = useTranslations(intl);

  if (!isHidden || !error) return null;

  return (
    <p
      className={`${isHidden ? "flex" : "hidden"} justify-center items-center gap-2 text-red-500`}
    >
      {t(`${error}`, { field })}
    </p>
  );
}
