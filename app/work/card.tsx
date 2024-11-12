import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  image: string;
};

export function WorkCard({ title, description, image }: CardProps) {
  return (
    <div className="flex w-full flex-col items-start justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 transition-all hover:cursor-pointer hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-700">
      <div>
        <div className="relative aspect-[16/9]">
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
