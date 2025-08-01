import type { navItem } from './NavItems'

import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'

import { NavItems } from './NavItems'

const items: navItem[] = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Why Tiger Stocks',
    link: '/login'
  },
  {
    title: 'Personal Finance',
    link: '/personal'
  },
  {
    title: 'Contact Us',
    link: '/contact'
  }
]

export function AppHeader() {
  const isLoggenIn = false
  return (
    <header className='relative min-h-[50px] w-full bg-vimpire-black lg:h-24'>
      <div
        className='container mx-auto flex h-full items-center justify-between'>
        <img src='/website-icons/logo.svg' />
        <div
          className='flex items-center justify-between gap-12
            text-traffic-white'>
          <NavItems items={items} />
          <div>
            <button className='text-gradient-cta p-4 font-Nexa font-bold'>
              <Link to='/signin'>LOGIN</Link>
            </button>
            {isLoggenIn ? (
              <Avatar>
                <AvatarImage
                  src='/website-icons/template_3.jpg'
                  alt='User'
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <button className='primary-button self-center p-2'>
                <Link to='/signup'>SIGN UP</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
