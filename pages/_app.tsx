import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import GTM from '~/components/GTM'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GTM />
      <Component {...pageProps} />
    </>
  )
}
