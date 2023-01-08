import { DefaultHeadTags } from '../../../components/meta/DefaultHeadTags'

import { readPost } from './data'

const Head: (props: {
  params: { postId: string }
}) => Promise<JSX.Element> = async ({ params }) => {
  const post = await readPost(params)

  if (!post) {
    return (
      <>
        <DefaultHeadTags />
      </>
    )
  }

  return (
    <>
      <title>{`${post.title} | Next13 Experimental`}</title>
      <DefaultHeadTags />
    </>
  )
}

export default Head
