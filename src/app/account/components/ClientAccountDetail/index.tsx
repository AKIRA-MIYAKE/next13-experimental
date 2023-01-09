'use client'

import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '../../../../contexts/AuthContext'

export const ClientAccountDetail: FC = () => {
  const router = useRouter()

  const { isAuthReady, user, signOut } = useAuthContext()

  const onSignOutButtonClick = useCallback(() => {
    signOut()
  }, [signOut])

  useEffect(() => {
    if (!isAuthReady) return
    if (user) return

    router.replace('/signin')
  }, [isAuthReady, user]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="form-control">
            <label className="label pt-0 pb-0.5">Nickname</label>
            <input
              type="text"
              className="input input-bordered"
              defaultValue={user.nickname}
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label pt-0 pb-0.5">Email</label>
            <input
              type="text"
              className="input input-bordered"
              defaultValue={user.email}
              disabled
            />
          </div>
        </div>

        <div>
          <button onClick={onSignOutButtonClick} className="btn btn-warning">
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
