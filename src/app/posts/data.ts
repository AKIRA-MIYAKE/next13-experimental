import { Post } from '../../interfaces'

export const listPost: () => Promise<{ items: Post[] }> = async () => {
  const response = await fetch('http://localhost:3001/posts')

  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message)
  }

  return response.json()
}
