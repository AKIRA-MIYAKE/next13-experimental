import Link from 'next/link'

import { Container } from '../components/layout/Container'
import { AppHeader } from '../components/app-header/AppHeader'

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <>
      <AppHeader />

      <main>
        <Container>
          <div className="space-y-6 mb-6">
            <div className="space-y-2">
              <div>
                <h1 className="text-4xl font-bold">Next13 Experimental</h1>
              </div>
              <div>
                <p>
                  Implementation sample using `app` directory of Next13
                  experimental function
                </p>
              </div>
              <div>
                <a
                  href="https://beta.nextjs.org/docs"
                  className="link link-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official documentation
                </a>
              </div>
            </div>

            <div>
              <Link href="/posts" className="link link-primary">
                See page with `Data Fetching`
              </Link>
            </div>

            <div>
              <Link href="/traditional" className="link link-primary">
                See page that rendered by `pages` directory
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Page
