import { Outlet, useLocation } from 'react-router-dom'

// import { Background } from '@/widgets/background'
import { AppHeader } from '@/widgets/header'

import { ROUTES } from '@/shared/model'

import { useInitAuth } from './routes/useInitAuth'

export function App() {
  useInitAuth()

  const location = useLocation()
  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER
  return (
    <div className={isAuthPage ? 'bg-[#0A0A0A]' : 'bg-light-gray'}>
      {!isAuthPage && <AppHeader />}
      {/* <Background /> */}
      <Outlet />
    </div>
  )
}
