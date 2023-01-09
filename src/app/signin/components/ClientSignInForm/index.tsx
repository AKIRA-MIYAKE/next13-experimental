'use client'

import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '../../../../contexts/AuthContext'
import {
  SignInForm,
  SignInFormProps,
} from '../../../../components/auth/SignInForm'

export const ClientSignInForm: FC = () => {
  const router = useRouter()

  const { isAuthReady, isSignedIn, signIn } = useAuthContext()

  const onSignInFormSubmit = useCallback<SignInFormProps['onSubmit']>(
    async ({ email, password }) => {
      try {
        await signIn({ email, password })
      } catch (error) {
        alert(error)
      }
    },
    [signIn]
  )

  useEffect(() => {
    if (!isAuthReady) return
    if (!isSignedIn) return

    router.replace('/')
  }, [isAuthReady, isSignedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  return <SignInForm onSubmit={onSignInFormSubmit} />
}
