import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Uses',
  description:
    "Here's what tech I'm currently using for coding, videos, and music.",
}

export default function UsesPage() {
  return (
    <section>
      <h1 className='font-bold text-2xl mb-8 tracking-tighter'>
        Here's my setup
      </h1>
      <div className='prose prose-neutral dark:prose-invert'>
        <h3 id='computer-office'>Computer / Office</h3>
        <ul>
          <li>Mac Mini (2020)</li>
          <li>24&quot; LG 24MP400-B</li>
          <li>Logitech G Pro Mouse</li>
          <li>Keychron V3 QMK</li>
        </ul>
        <h3 id='coding'>Coding</h3>
        <ul>
          <li>
            Editor: VSCode (
            {/* <a href='https://gist.github.com/leerob/e7883ab35d900b8cbb684ac77e7c470'>*/}
            <a href='#'>Settings / Extensions</a>)
          </li>
          <li>Theme: Dark Plus</li>
          <li>Terminal: iTerm2 / zsh</li>
        </ul>
        <h3 id='audio-video'>Audio</h3>
        <ul>
          <li>Sony WH 1000XM4</li>
        </ul>
        <h3 id='software'>Software</h3>
        <ul>
          <li>1Password</li>
          <li>Apple Music</li>
          <li>Obsidian</li>
          <li>Grammarly</li>
          <li>Texts</li>
          <li>Raycast</li>
        </ul>
        <h3 id='other-tech'>Other Tech</h3>
        <ul>
          <li>Apple Airpods</li>
          <li>Apple iPad</li>
          <li>Apple iPhone</li>
          <li>Apple Pencil</li>
        </ul>
      </div>
    </section>
  )
}
