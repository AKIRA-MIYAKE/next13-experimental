import type { FC } from 'react'

import { Post } from '../../../interfaces'
import { PostListItem } from '../PostListItem'

export interface PostListProps {
  posts: Post[]
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  )
}
