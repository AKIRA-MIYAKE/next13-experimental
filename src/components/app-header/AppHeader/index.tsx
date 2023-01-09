import type { FC } from 'react'

import { Container } from '../../layout/Container'
import { AppHeaderLogo } from '../AppHeaderLogo'
import { ClientAppHeaderAccountArea  } from '../ClientAppHeaderAccountArea'

export const AppHeader: FC = () => {
  return (
    <header className="py-4">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <AppHeaderLogo />
          </div>

          <div>
            <ClientAppHeaderAccountArea />
          </div>
        </div>
      </Container>
    </header>
  )
}
