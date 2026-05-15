import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        active: 'bg-blue-600 border-blue-700 text-white',
        idle: 'bg-zinc-700 border-zinc-600 text-zinc-200',
        finished: 'bg-zinc-800 border-zinc-700 text-zinc-400',
        default: 'bg-zinc-800 border-zinc-700 text-zinc-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
