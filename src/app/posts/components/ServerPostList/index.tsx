import { PostList } from '../../../../components/posts/PostList'

import { listPost } from '../../data'

export const ServerPostList: () => Promise<JSX.Element> = async () => {
  const postCollection = await listPost()

  return <PostList posts={postCollection.items} />
}
