import { Post } from '../../../interfaces'

export const readPost: (params: {
  postId: string
}) => Promise<Post | undefined> = async ({ postId }) => {
  const response = await fetch(`http://localhost:3001/posts/${postId}`)

  if (!response.ok) {
    if (response.status === 404) {
      return undefined
    }

    const body = await response.json()
    throw new Error(body.message)
  }

  return response.json()
}
