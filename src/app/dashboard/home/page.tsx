
'use client';

import { TrainCard } from '@/components/dashboard/train-card';
import { VerificationFocus } from '@/components/dashboard/verification-focus';
import { trains } from '@/lib/data';
import type { Train } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Filter } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export default function DashboardHomePage() {
  const train: Train | undefined = trains[0];

  if (!train) {
    return <div>Train not found</div>;
  }

  return (
    <div className="grid gap-6">
      <div className="bg-card p-4 rounded-lg border">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">{train.trainNumber}-{train.name}</h1>
          <div className="flex items-center gap-1 text-sm font-medium text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            ONLINE
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Last Sync: Just Now</p>

        <div className="mt-4">
            <div className="flex justify-between items-end text-sm">
                <div>
                    <p className='text-xs text-muted-foreground'>CURRENT LOCATION</p>
                    <p className="font-bold">New Delhi</p>
                </div>
                <div className='text-right'>
                    <p className='text-xs text-muted-foreground'>NEXT</p>
                    <p className="font-bold">Kanpur Central</p>
                </div>
            </div>
            <Progress value={train.journeyProgress} className="h-1 mt-2" />
             <div className="flex justify-between items-end text-xs text-muted-foreground mt-1">
                <p>NDLS</p>
                <p>Distance: 450km</p>
                <p>CNB</p>
            </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="rounded-full">All Coaches ({train.coaches.length})</Button>
        <Button size="sm" variant="outline" className="rounded-full flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 text-yellow-400" /> Attention (2)</Button>
        <Button size="sm" variant="outline" className="rounded-full">AC Class</Button>
      </div>

       <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
          COACH OVERVIEW
        </h2>
        <div className="grid grid-cols-2 gap-4">
            {train.coaches.map((coach) => (
                <TrainCard key={coach.id} coach={coach} />
            ))}
        </div>
       </div>

      <VerificationFocus trains={[train]} />
    </div>
  );
}
