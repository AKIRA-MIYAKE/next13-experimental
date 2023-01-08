import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '../../../components/layout/Container'

import { readPost } from './data'

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
        <div className="flex justify-between mb-4">
          <div>
            <Link href="/posts" className="link link-primary">
              Back
            </Link>
          </div>
        </div>
      </Container>

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <div>
                <h1 className="text-4xl font-bold">{post.title}</h1>
              </div>
              <div>
                <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <p>{post.body}</p>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Page