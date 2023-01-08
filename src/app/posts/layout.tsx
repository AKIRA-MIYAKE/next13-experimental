import type { ReactNode } from 'react'

import { AppHeader } from '../../components/app-header/AppHeader'

const Layout: (props: { children: ReactNode }) => JSX.Element = ({
  children,
}) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}

export default Layout
