export function ProjectCard({ title, link, description }) {
  return (
    <a href={link} target="blank" className="rounded-b-xl">
      <div className="border border-neutral-200 dark:border-neutral-700">
        <img
          src={"/og-bg.png"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2 bg-neutral-700 dark:bg-neutral-800 rounded-b-xl max-h-20 overflow-visible border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-md font-semibold">{title}</h2>
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      </div>
    </a>
  );
}
