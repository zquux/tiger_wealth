import * as React from 'react'

import { cn } from '../lib'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `bg-dark-gray placeholder:font-PTSerir flex h-10 w-full rounded-md
          border border-none px-4 py-2 font-PTSerif text-base text-silver-gray
          shadow-sm transition-colors file:border-0 file:bg-transparent
          file:text-sm file:font-medium file:text-foreground
          placeholder:text-base placeholder:text-silver-gray focus:outline-none
          focus-visible:outline-none disabled:cursor-not-allowed
          disabled:opacity-50 md:text-sm`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
