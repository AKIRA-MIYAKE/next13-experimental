import type { FC } from 'react'
import Link from 'next/link'

import { User } from '../../../interfaces'

export interface AppHeaderAccountAreaProps {
  user?: User
}

export const AppHeaderAccountArea: FC<AppHeaderAccountAreaProps> = ({
  user,
}) => {
  return (
    <div>
      {user ? (
        <Link href="/account" className="link link-primary">
          {user.nickname}
        </Link>
      ) : (
        <Link href="/signin" className="link link-primary">
          Sign in
        </Link>
      )}
    </div>
  )
}
