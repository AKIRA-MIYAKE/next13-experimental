'use client'

import type { FC } from 'react'
import Link from 'next/link'

import { useAuthContext } from '../../../../../contexts/AuthContext'

export interface ClientAuthorToolbarProps {
  postId: string
}

export const ClientAuthorToolbar: FC<ClientAuthorToolbarProps> = ({
  postId,
}) => {
  const { isSignedIn } = useAuthContext()

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="flex justify-end">
      <div>
        <Link href={`/posts/${postId}/edit`} className="link link-primary">
          Edit
        </Link>
      </div>
    </div>
  )
}
