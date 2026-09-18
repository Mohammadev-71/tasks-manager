


export default function PageHeader({title}:{title:string}){
    return(
        <section className="w-full flex justify-start items-center text-sky-600 bg-gray-100 dark:bg-zinc-950 p-4 m-1 border-b border-sky-600">
            <p className="text-xl">{title}</p>
        </section>
    )
}