

'use client';

import type { Train, Seat, Alert as AlertType } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ArrowRight, ShieldAlert, AlertTriangle, CheckCircle, Wifi } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface VerificationFocusProps {
  trains: Train[];
}

type PrioritySeat = Seat & { trainNumber: string; coachId: string };

const getAlerts = (trains: Train[]) => {
    const allAlerts: AlertType[] = trains.flatMap(train => train.alerts);
    const highPriority = allAlerts.filter(a => a.urgency === 'high');
    const mediumPriority = allAlerts.filter(a => a.urgency === 'medium');
    const lowPriority = allAlerts.filter(a => a.urgency === 'low');
    return { highPriority, mediumPriority, lowPriority, allAlerts };
}

const alertBadges = {
    high: 'destructive',
    medium: 'secondary',
    low: 'outline',
} as const;

export function VerificationFocus({ trains }: VerificationFocusProps) {
  const { highPriority, allAlerts } = getAlerts(trains);

  return (
    <Card className="lg:col-span-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-primary" />
          Priority Alerts
        </CardTitle>
         <p className="text-sm text-muted-foreground">Last synced: just now</p>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className='font-bold'>{highPriority.length}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="space-y-2">
           <p className='font-bold text-destructive'>{allAlerts.filter(a => a.urgency === 'high').length}</p>
          <p className="text-sm text-muted-foreground">High Priority</p>
        </div>
      </CardContent>
      <CardContent>
        <h3 className="font-semibold mb-4">CURRENT ALERTS</h3>
        <div className="space-y-4">
            {allAlerts.slice(0,3).map(alert => (
                 <div key={alert.id} className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                    <div>
                        <div className='flex items-center gap-2'>
                            {alert.seatId && <p className="font-bold">{alert.seatId.replace(alert.coachId+'-', '')}</p>}
                             <Badge variant={alertBadges[alert.urgency]}>{alert.urgency}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    {alert.seatId && (
                         <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/coach/${alert.coachId}?seat=${alert.seatId}`}>View Seat</Link>
                        </Button>
                    )}
                 </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
