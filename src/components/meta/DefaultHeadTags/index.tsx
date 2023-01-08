import type { FC } from 'react'

export const DefaultHeadTags: FC = () => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Next13 experimental app" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
