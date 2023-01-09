import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '../../../../components/layout/Container'

import { readPost } from '../data'
import { ClientPostForm } from './components/ClientPostForm'

const Page: (props: {
  params: { postId: string }
}) => Promise<JSX.Element> = async ({ params }) => {
  const post = await readPost(params)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Container>
        <div className="py-4">
          <Link href={`/posts/${params.postId}`} className="link link-primary">
            Back
          </Link>
        </div>
      </Container>

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div>
              <div>
                <h1 className="text-4xl font-bold">Edit post</h1>
              </div>
            </div>

            <div>
              <ClientPostForm post={post} />
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Page
