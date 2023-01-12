'use client'

import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '../../../../../contexts/AuthContext'
import {
  PostForm,
  PostFormProps,
} from '../../../../../components/posts/PostForm'

export const ClientPostForm: FC = () => {
  const router = useRouter()

  const { token } = useAuthContext()

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

      router.push('/posts?refresh=true')
    },
    [router, token]
  )

  return <PostForm onSubmit={onPostFormSubmit} />
}
