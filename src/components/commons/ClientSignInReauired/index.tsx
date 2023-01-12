'use client'

import type { FC } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '../../../contexts/AuthContext'

export const ClientSignInRequired: FC = () => {
  const router = useRouter()

  const { isAuthReady, isSignedIn } = useAuthContext()

  useEffect(() => {
    if (!isAuthReady) return
    if (isSignedIn) return

    router.replace('/signin')
  }, [router, isAuthReady, isSignedIn])

  return null
}
