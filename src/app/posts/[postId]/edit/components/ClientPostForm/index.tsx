'use client'

import type { FC } from 'react'
import { useCallback, useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation'

import type { Post } from '../../../../../../interfaces'
import { useAuthContext } from '../../../../../../contexts/AuthContext'
import {
  PostForm,
  PostFormProps,
} from '../../../../../../components/posts/PostForm'

export interface ClientPostFormProps {
  post: Post
}

export const ClientPostForm: FC<ClientPostFormProps> = ({ post }) => {
  const router = useRouter()

  const { isAuthReady, isSignedIn, token } = useAuthContext()

  const onPostFormSubmit = useCallback<PostFormProps['onSubmit']>(
    async ({ title, body }) => {
      if (!token) return

      const response = await fetch(`http://localhost:3001/posts/${post.id}`, {
        method: 'PATCH',
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
        router.push(`/posts/${post.id}`)
      })
    },
    [post.id, token]
  )

  const onPostFormRequireDeleting = useCallback(async () => {
    if (!token) return

    const response = await fetch(`http://localhost:3001/posts/${post.id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  }, [post.id, token])

  useEffect(() => {
    if (!isAuthReady) return
    if (isSignedIn) return

    router.replace(`/posts/${post.id}`)
  }, [post.id, isAuthReady, isSignedIn])

  return (
    <PostForm
      defaultValue={post}
      onSubmit={onPostFormSubmit}
      onRequireDeleting={onPostFormRequireDeleting}
    />
  )
}
