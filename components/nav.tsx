'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Network, BarChart2, Clock, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/',          label: 'Home',      icon: Home },
  { href: '/graph',     label: 'Graph',     icon: Network },
  { href: '/timeline',  label: 'Timeline',  icon: Clock },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gold/10 border border-gold/30 group-hover:bg-gold/20 transition-colors">
            <Network className="h-4 w-4 text-gold" />
          </div>
          <span className="font-display text-sm font-bold tracking-tight text-foreground hidden sm:block">
            Hip-Hop<span className="text-gold"> KG</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-gold/15 text-gold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Live badge */}
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-jade animate-pulse" aria-hidden="true" />
          <span className="text-xs text-muted-foreground hidden sm:block">Live</span>
        </div>
      </div>
    </header>
  )
}
