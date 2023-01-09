'use client'

import type { FC } from "react"

import { useAuthContext } from "../../../contexts/AuthContext"

import { AppHeaderAccountArea  } from "../AppHeaderAccountArea"

export const ClientAppHeaderAccountArea: FC = () => {
  const { isAuthReady, user } = useAuthContext()

  if (!isAuthReady) {
    return null
  }

  return <AppHeaderAccountArea user={user} />
}
