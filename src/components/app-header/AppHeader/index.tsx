import type { FC } from 'react'

import { Container } from '../../layout/Container'
import { AppHeaderLogo } from '../AppHeaderLogo'

export const AppHeader: FC = () => {
  return (
    <header className="py-4">
      <Container>
        <div>
          <div>
            <AppHeaderLogo />
          </div>
        </div>
      </Container>
    </header>
  )
}
