import { Dispatch, SetStateAction } from "react";

export default function TextArea({
  name,
  placeholder,
  value,
  setState
}: {
  name: string;
  placeholder: string;
  value?: string;
  setState?:Dispatch<SetStateAction<boolean>>
}) {
  return (
    <textarea
      onChange={()=>setState?setState(true):null}
      name={name}
      placeholder={placeholder}
      rows={1}
      defaultValue={value}
      className="w-full resize-none overflow-hidden rounded-lg border border-transparent bg-transparent p-2 text-xl font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-sky-200 dark:text-slate-100 dark:placeholder:text-slate-500"
      ref={(textarea) => {
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      }}
      onInput={(e) => {
        const textarea = e.currentTarget;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }}
    />
  );
}
