import { Home, Ticket, Bell, User } from 'lucide-react';
import Link from 'next/link';

export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
       <main className="flex-1 pb-20">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-2 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/passenger/overview" className="flex flex-col items-center gap-1 text-primary">
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">Journey</span>
          </Link>
          <Link href="/passenger/verification" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
            <Ticket className="h-6 w-6" />
            <span className="text-xs">Ticket</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
            <Bell className="h-6 w-6" />
            <span className="text-xs">Updates</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
