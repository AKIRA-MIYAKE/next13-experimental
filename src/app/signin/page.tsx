import { Container } from "../../components/layout/Container"
import { AppHeaderLogo } from "../../components/app-header/AppHeaderLogo"

import { ClientSignInForm } from "./components/ClientSignInForm"

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <>
      <header className="py-4">
        <Container>
          <div>
            <div>
              <AppHeaderLogo />
            </div>
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold">Sign in</h1>
            </div>

            <div>
              <ClientSignInForm />
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Page
