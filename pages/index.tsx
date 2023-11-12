import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Hyperlink | Home</title>
        <meta name="google-site-verification" content="MfqeFmERle_FbpFYN6Zzh1R4Y1slWXNEfNKtya0mqW8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <div className="w-screen h-screen flex justify-center items-center">
          <Link href="/connections">Connect with others</Link>
        </div>
      </main>
    </>
  )
}
