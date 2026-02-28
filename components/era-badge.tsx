import { ERA_COLORS } from '@/lib/types'
import { cn } from '@/lib/utils'

interface EraBadgeProps {
  eraId: string | null
  eraName?: string | null
  className?: string
  size?: 'sm' | 'md'
}

export function EraBadge({ eraId, eraName, className, size = 'sm' }: EraBadgeProps) {
  if (!eraId) return null
  const color = ERA_COLORS[eraId] ?? '#444'
  const isDark = ['era_roots', 'era_birth', 'era_golden', 'era_east_west', 'era_bling', 'era_internet', 'era_trap', 'era_modern'].includes(eraId)

  return (
    <span
      className={cn(
        'inline-flex items-center rounded font-medium leading-none',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        className
      )}
      style={{
        backgroundColor: color,
        color: isDark ? '#F0EDE8' : '#0A0A0A',
      }}
    >
      {eraName ?? eraId.replace('era_', '').replace('_', ' ')}
    </span>
  )
}
