import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  image: string;
};

export function WorkCard({ title, description, image }: CardProps) {
  return (
    <div className="transition-all border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:border-neutral-300 hover:bg-neutral-100 dark:hover:border-neutral-600 dark:hover:bg-neutral-700 rounded flex flex-col items-start justify-between px-3 py-4 w-full hover:cursor-pointer">
      <div>
        <div className="aspect-[16/9] relative">
          <Image
            alt="miniatura"
            className="object-cover"
            src={`/images/projects/${image}.png`}
            fill
          />
        </div>
        <div className="mt-4">
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
