import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

export type navItem = {
  title: string
  link: string
}

type navItemProps = {
  items: navItem[]
}

export function NavItems({ items }: navItemProps) {
  const listItems = useMemo(
    () =>
      items.map(item => (
        <li
          key={item.link}
          className='font-PTSerif'>
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? 'mb-4 h-full border-b-[2px] border-tangerine font-bold'
                : ''
            }>
            {item.title}
          </NavLink>
        </li>
      )),
    [items]
  )
  return <ul className='flex gap-6'>{listItems}</ul>
}
