import type { ReactNode } from 'react'

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
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
