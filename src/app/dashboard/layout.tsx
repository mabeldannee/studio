import { AuthGuard } from '@/components/dashboard/auth-guard';
import { Home, ClipboardList, User, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen w-full bg-background">
        <main className="flex-1 pb-20">
          {children}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 p-2">
            <nav className="flex justify-around items-center">
                <Link href="#" className="flex flex-col items-center gap-1 text-primary">
                    <Home className="h-6 w-6" />
                    <span className="text-xs font-bold">Alerts</span>
                </Link>
                 <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
                    <ClipboardList className="h-6 w-6" />
                    <span className="text-xs">Manifest</span>
                </Link>
                 <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
                    <BarChart className="h-6 w-6" />
                    <span className="text-xs">Summary</span>
                </Link>
                 <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
                    <User className="h-6 w-6" />
                    <span className="text-xs">Profile</span>
                </Link>
            </nav>
        </footer>
      </div>
    </AuthGuard>
  );
}
