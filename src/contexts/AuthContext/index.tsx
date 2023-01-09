'use client'

import type { FC, ReactNode } from 'react'
import {
  createContext,
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from 'react'

import { User } from '../../interfaces'

export interface AuthContextValue {
  isAuthReady: boolean
  isSignedIn: boolean
  user?: User
  token?: string
  signIn: (params: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  isAuthReady: false,
  isSignedIn: false,
  user: undefined,
  token: undefined,
  signIn: async () => {},
  signOut: async () => {},
})

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [user, setUser] = useState<User | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)

  const isSessionCheckingRef = useRef(false)

  const isSignedIn = useMemo(() => {
    return !!user && !!token
  }, [user, token])

  const signIn = useCallback<AuthContextValue['signIn']>(
    async ({ email, password }) => {
      const response = await fetch('http://localhost:3001/signin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body.message)
      }

      const { user, token } = await response.json()

      window.sessionStorage.setItem('token', token)

      setUser(user)
      setToken(token)
    },
    []
  )

  const signOut = useCallback(async () => {
    if (!token) return

    const response = await fetch('http://localhost:3001/signout', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.message)
    }

    window.sessionStorage.removeItem('token')

    setUser(undefined)
    setToken(undefined)
  }, [token])

  useEffect(() => {
    if (isAuthReady) return
    if (isSessionCheckingRef.current) return

    const token = window.sessionStorage.getItem('token')

    if (token === null) {
      setIsAuthReady(true)
      return
    }

    ;(async () => {
      isSessionCheckingRef.current = true

      const response = await fetch('http://localhost:3001/me', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        window.sessionStorage.removeItem('token')
        setIsAuthReady(true)
        return
      }

      const user = await response.json()

      setToken(token)
      setUser(user)
      setIsAuthReady(true)
      isSessionCheckingRef.current = false
    })()
  }, [isAuthReady])

  return (
    <AuthContext.Provider
      value={{
        isAuthReady,
        isSignedIn,
        user,
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext: () => AuthContextValue = () => {
  return useContext(AuthContext)
}
