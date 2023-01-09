'use client'

import type { FC } from 'react'
import { useCallback, useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '../../../../../contexts/AuthContext'
import {
  PostForm,
  PostFormProps,
} from '../../../../../components/posts/PostForm'

export const ClientPostForm: FC = () => {
  const router = useRouter()

  const { isAuthReady, isSignedIn, token } = useAuthContext()

  const onPostFormSubmit = useCallback<PostFormProps['onSubmit']>(
    async ({ title, body }) => {
      if (!token) return

      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      })

      if (!response.ok) {
        const body = await response.json()
        alert(body.message)
        return
      }

      startTransition(() => {
        router.refresh()
        router.push('/posts')
      })
    },
    [token]
  )

  useEffect(() => {
    if (!isAuthReady) return
    if (isSignedIn) return

    router.replace('/posts')
  }, [isAuthReady, isSignedIn])

  if (!isSignedIn) {
    return null
  }

  return <PostForm onSubmit={onPostFormSubmit} />
}
