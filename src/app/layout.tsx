import type { ReactNode } from 'react'

import { AuthContextProvider } from '../contexts/AuthContext'

import '../styles/global.css'

const RootLayout: (props: { children: ReactNode }) => JSX.Element = ({
  children,
}) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
