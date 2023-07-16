import Image from 'next/image'
import {
  ArrowIcon,
  GitHubIcon,
  ThreadsIcon,
  TwitterIcon,
} from './components/icons'
import { name, about, bio, avatar } from 'lib/info'

export default function Page() {
  return (
    <section>
      <h1 className='font-bold text-3xl'>{name}</h1>
      <p className='my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200'>
        {about()}
      </p>
      {/**<div className='flex items-start md:items-center my-8 flex-col md:flex-row'>*/}
      <div className='flex items-center justify-start my-8 space-x-6 md:space-x-8'>
        <Image
          alt={name}
          className='rounded-full grayscale'
          src={avatar}
          placeholder='blur'
          width={100}
          priority
        />
        <div className='flex flex-col space-y-3 text-neutral-500 dark:text-neutral-400'>
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://twitter.com/juamp_m'
            className='flex items-center gap-2 dark:hover:text-neutral-200'
          >
            <TwitterIcon />
          </a>
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://threads.net/@juampe_m'
            className='flex items-center gap-2 dark:hover:text-neutral-200'
          >
            <ThreadsIcon />
          </a>
          <a
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/jmartinn'
            className='flex items-center gap-2 dark:hover:text-neutral-200'
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
      {bio()}
      <div className='prose prose-neutral dark:prose-invert text-justify'>
        <p>
          Apart from coding, I have a passion for sports and bring my optimism
          and discipline into every project I take on.
        </p>
        <blockquote className='font-semibold'>
          I firmly believe that developers are akin to poets, scripting the
          world's most impactful language - the language of machines.
        </blockquote>
        <p>
          I'm always eager to connect and collaborate on interesting projects,
          while consistently learning and growing in this ever-evolving tech
          industry.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert text-justify'>
        <p>
          I'm thrilled to be venturing into a new project: launching my own
          blog. My goal is to share my knowledge and experiences from my journey
          in the tech industry, provide in-depth tech tutorials, and explore new
          technologies. This platform will serve as a dynamic hub for fellow
          developers and tech enthusiasts.
        </p>
        <p>
          I also deeply value the tech community and the spirit of collaboration
          it fosters. Whether it's open-source contribution, discussing new
          ideas, or solving challenges together, the sense of collective growth
          is what makes this field truly enriching for me. I look forward to
          more opportunities for connection and innovation
        </p>
      </div>
      <ul className='flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400'>
        <li>
          <a
            className='flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all'
            rel='noopener noreferrer'
            target='_blank'
            href='https://twitter.com/leeerob'
          >
            <ArrowIcon />
            <p className='h-7'>follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            className='flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all'
            rel='noopener noreferrer'
            target='_blank'
            href='https://threads.net/@juampe_m'
          >
            <ArrowIcon />
            <p className='h-7'>follow me on threads</p>
          </a>
        </li>
        <li>
          <a
            className='flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all'
            rel='noopener noreferrer'
            target='_blank'
            href='https://leerob.substack.com'
          >
            <ArrowIcon />
            <p className='h-7'>get email updates</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
