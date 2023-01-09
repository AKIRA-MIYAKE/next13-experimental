import type { NextPage } from 'next'

import { useAuthContext } from '../../contexts/AuthContext'
import { Container } from '../../components/layout/Container'
import { AppHeader } from '../../components/app-header/AppHeader'

const IndexPage: NextPage = () => {
  const { user } = useAuthContext()

  return (
    <>
      <AppHeader />

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold">Traditional page</h1>
            </div>

            <div>
              <p>
                If you are signed in, you should be able to see your nickname.
              </p>
              {user && <p className="font-bold">{user.nickname}</p>}
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default IndexPage
