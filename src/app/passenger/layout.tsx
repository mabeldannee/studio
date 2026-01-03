
'use client';

import { Home, Ticket, Bell, MapPinned } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/passenger/overview', icon: Home, label: 'Home' },
  { href: '/passenger/journey', icon: MapPinned, label: 'Journey' },
  { href: '/passenger/verification', icon: Ticket, label: 'Ticket' },
  { href: '/passenger/updates', icon: Bell, label: 'Updates' },
];

export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/30">
      <main className="flex-1 pb-20">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
             const isActive = pathname === item.href;
             return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 w-16',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className={cn('text-xs', isActive ? 'font-bold' : 'font-medium')}>
                    {item.label}
                  </span>
                </Link>
             )
          })}
        </nav>
      </footer>
    </div>
  );
}
