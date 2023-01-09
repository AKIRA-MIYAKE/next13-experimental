import type { AppProps } from 'next/app'
import Head from 'next/head'

import { AuthContextProvider } from '../contexts/AuthContext'

import '../styles/global.css'

const App: (props: AppProps) => JSX.Element = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Next13 Experimental</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Next13 experimental app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}

export default App
