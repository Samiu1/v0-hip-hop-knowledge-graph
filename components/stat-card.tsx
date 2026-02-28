import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
  className?: string
}

export function StatCard({ label, value, sub, accent, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card p-4 flex flex-col gap-1',
        accent && 'border-gold/30 bg-gold/5',
        className
      )}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className={cn('font-display text-2xl font-bold tabular-nums', accent ? 'text-gold' : 'text-foreground')}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}
