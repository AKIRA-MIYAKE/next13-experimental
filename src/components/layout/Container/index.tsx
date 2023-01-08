import type { FC, ReactNode } from 'react'

export interface ContainerProps {
  children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-2xl mx-auto px-4">{children}</div>
}
