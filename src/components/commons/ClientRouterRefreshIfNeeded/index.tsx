'use client'

import type { FC } from 'react'
import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const ClientRouterRefreshIfNeeded: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('refresh') !== 'true') {
      return
    }

    router.refresh()

    const newSearchParams = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => {
        if (key === 'refresh') {
          return acc
        }

        return `${acc}&${key}=${value}`
      },
      ''
    )

    const newUrl =
      newSearchParams.length > 0
        ? `${pathname}?${newSearchParams}`
        : pathname || '/'

    router.replace(newUrl)
  }, [router, pathname, searchParams])

  return null
}
