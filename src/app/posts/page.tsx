import { Suspense } from 'react'

import { Container } from '../../components/layout/Container'

import { ClientAuthorToolbar } from './components/ClientAuthorToolbar'
import { ServerPostList } from './components/ServerPostList'

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <main>
      <Container>
        <div className="space-y-6 mb-6">
          <ClientAuthorToolbar />

          <div>
            <h1 className="text-4xl font-bold">Posts</h1>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            {/* @ts-expect-error Server Component */}
            <ServerPostList />
          </Suspense>
        </div>
      </Container>
    </main>
  )
}

export default Page
