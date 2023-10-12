import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <div className="w-screen h-screen flex justify-center items-center">
        <Link href="/connections">Connect with others</Link>
      </div>
    </main>
  )
}
