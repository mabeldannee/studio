
'use client';

import { trains } from '@/lib/data';
import type { Train } from '@/lib/types';
import { VerificationFocus } from '@/components/dashboard/verification-focus';
import { Filter, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardHomePage() {
  const train: Train | undefined = trains[0];

  if (!train) {
    return <div>Train not found</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                LIVE
            </div>
        </div>
        <h1 className="text-xl font-bold">Priority Alerts</h1>
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
      </div>
       <p className="text-sm text-muted-foreground -mt-4 text-center">Last synced: just now</p>
      
      <VerificationFocus trains={[train]} />
    </div>
  );
}
