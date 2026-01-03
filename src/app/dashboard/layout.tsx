
'use client';

import { AuthGuard } from '@/components/dashboard/auth-guard';
import { Home, ClipboardList, User, BarChart, Bell, MessageSquare, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/dashboard/header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// Assuming role is stored in localStorage after login
const getRole = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('rail-assist-role') || 'TTE';
    }
    return 'TTE';
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [role, setRole] = useState('TTE');

  useEffect(() => {
    setRole(getRole());
  }, []);

  const tteNavItems = [
    { href: '/dashboard/home', icon: Home, label: 'Alerts' },
    { href: '#', icon: ClipboardList, label: 'Manifest' },
    { href: '#', icon: BarChart, label: 'Summary' },
    { href: '/login', icon: User, label: 'Profile' },
  ];

  const obhsNavItems = [
      { href: '/dashboard/obhs', icon: Wrench, label: 'Requests' },
      { href: '#', icon: Bell, label: 'Alerts' },
      { href: '#', icon: MessageSquare, label: 'Chat' },
      { href: '#', icon: User, label: 'Profile' },
  ];

  const navItems = role === 'OBHS' ? obhsNavItems : tteNavItems;
  const defaultHome = role === 'OBHS' ? '/dashboard/obhs' : '/dashboard/home';

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen w-full bg-background">
        <Header />
        <main className="flex-1 p-4 pb-20">
          {children}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 p-2 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
            <nav className="flex justify-around items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href === defaultHome && pathname.startsWith('/dashboard'));
                    return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={cn(
                            'flex flex-col items-center gap-1 w-16 transition-colors',
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
    </AuthGuard>
  );
}
