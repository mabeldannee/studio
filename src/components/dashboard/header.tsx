import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className='flex items-center gap-1 text-sm font-medium text-green-400'>
          <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></div>
          ONLINE
        </div>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
            <UserNav />
        </div>
      </div>
    </header>
  );
}
