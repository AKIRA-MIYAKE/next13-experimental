import type { FC } from 'react'
import Link from 'next/link'

export const AppHeaderLogo: FC = () => {
  return (
    <div>
      <Link href="/" className="text-lg font-bold hover:underline">
        Next13 Experimental
      </Link>
    </div>
  )
}
