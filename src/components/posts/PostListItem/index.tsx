import type { FC } from 'react'
import Link from 'next/link'

import type { Post } from '../../../interfaces'

export interface PostListItemProps {
  post: Post
}

export const PostListItem: FC<PostListItemProps> = ({ post }) => {
  return (
    <li key={post.id}>
      <div className="flex justify-between">
        <div>
          <Link
            href={`/posts/${post.id}`}
            className="link link-primary font-bold"
          >
            {post.title}
          </Link>
        </div>

        <div className="w-40 flex-none text-right">
          <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </li>
  )
}
