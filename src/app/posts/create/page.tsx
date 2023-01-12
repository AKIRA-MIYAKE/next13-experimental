import Link from 'next/link'

import { Container } from '../../../components/layout/Container'
import { ClientSignInRequired } from '../../../components/commons/ClientSignInReauired'

import { ClientPostForm } from './components/ClientPostForm'

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <>
      <Container>
        <div className="py-4">
          <Link href="/posts" className="link link-primary">
            Back
          </Link>
        </div>
      </Container>

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold">Create post</h1>
            </div>
          </div>

          <div>
            <ClientPostForm />
          </div>
        </Container>
      </main>

      <ClientSignInRequired />
    </>
  )
}

export default Page
