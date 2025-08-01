import { useState } from 'react'
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/shared/ui'

type SortButtonProps = {
  name1: string
  name2: string
  title: string
  field: string
  onSort: (header: {
    title: string
    name1: string
    name2: string
    field: string
    direction: 'asc' | 'desc'
  }) => void
}

export function SortableHeader({
  title,
  name1,
  name2,
  field,
  onSort
}: SortButtonProps) {
  const [position, setPosition] = useState('')

  return (
    <DropdownMenu>
      <div className='flex items-start'>
        {title}

        <DropdownMenuTrigger>
          <ChevronsUpDown className='size-4' />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={setPosition}>
          <DropdownMenuRadioItem
            value='top'
            onClick={() =>
              onSort({
                title,
                name1,
                name2,
                field,
                direction: 'asc'
              })
            }>
            <ArrowUp />
            {name1}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='bottom'
            onClick={() =>
              onSort({
                title,
                name1,
                name2,
                field,
                direction: 'desc'
              })
            }>
            <ArrowDown />
            {name2}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
