'use client'

import type { FC } from "react"
import Link from "next/link"

import { useAuthContext } from "../../../../contexts/AuthContext"

export const ClientAuthorToolbar: FC = () => {
  const { isSignedIn } = useAuthContext()

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="flex justify-end">
      <div>
        <Link href="/posts/create" className="link link-primary">Create</Link>
      </div>
    </div>
  )
}
