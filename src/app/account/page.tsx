import { Container } from "../../components/layout/Container";
import { AppHeader } from "../../components/app-header/AppHeader";

import { ClientAccountDetail } from "./components/ClientAccountDetail";

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <>
      <AppHeader />

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold">Account</h1>
            </div>
          </div>

          <div>
            <ClientAccountDetail />
          </div>
        </Container>
      </main>
    </>
  )
}

export default Page
