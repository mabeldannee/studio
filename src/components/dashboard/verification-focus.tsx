

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
import { Eye, ArrowRight, ShieldAlert, AlertTriangle, CheckCircle, Wifi, UserX, Ticket } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface VerificationFocusProps {
  trains: Train[];
}

const getAlerts = (trains: Train[]) => {
    const allAlerts: AlertType[] = trains.flatMap(train => train.alerts);
    const highPriority = allAlerts.filter(a => a.urgency === 'high');
    const mediumPriority = allAlerts.filter(a => a.urgency === 'medium');
    const lowPriority = allAlerts.filter(a => a.urgency === 'low');
    return { highPriority, mediumPriority, lowPriority, allAlerts };
}

const alertConfig = {
    'Passenger age discrepancy': {
        icon: ShieldAlert,
        badge: 'High Conf.',
        badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
        buttonText: 'View Seat'
    },
    'Likely Vacant (No-show predicted)': {
        icon: UserX,
        badge: 'Med Conf.',
        badgeClass: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        buttonText: 'View Seat'
    },
    'Ticket not scanned at entry': {
        icon: Ticket,
        badge: 'High Conf.',
        badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
        buttonText: 'View Seat'
    },
     'High crowd density detected': {
        icon: AlertTriangle,
        badge: 'Low Conf.',
        badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        buttonText: null
    },
    'default': {
        icon: AlertTriangle,
        badge: 'Info',
        badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        buttonText: 'View'
    }
}


export function VerificationFocus({ trains }: VerificationFocusProps) {
  const { highPriority, allAlerts } = getAlerts(trains);

  return (
    <>
      <Card className="lg:col-span-12">
          <CardContent className="grid grid-cols-2 gap-4 p-4">
              <div className="space-y-1">
                <p className='text-sm text-muted-foreground'>Pending</p>
                <p className='font-bold text-2xl'>{allAlerts.length}</p>
              </div>
              <div className="space-y-1">
                <p className='text-sm text-muted-foreground text-red-400'>High Priority</p>
                <p className='font-bold text-2xl text-red-400'>{highPriority.length}</p>
              </div>
          </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-muted-foreground text-sm">CURRENT ALERTS</h3>
            {allAlerts.map(alert => {
                const config = alertConfig[alert.type as keyof typeof alertConfig] || alertConfig.default;
                 return (
                 <div key={alert.id} className="p-4 bg-card rounded-lg border flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold">{alert.seatId ? alert.seatId.replace(alert.coachId + '-', '') : `Coach ${alert.coachId.split('-').pop()}`}</p>
                            <p className="text-sm text-muted-foreground">{alert.type}</p>
                        </div>
                        <Badge variant="outline" className={cn(config.badgeClass, 'flex gap-1.5')}>
                            <config.icon className="h-3.5 w-3.5" />
                            {config.badge}
                        </Badge>
                    </div>

                    {alert.type === 'High crowd density detected' && (
                        <div className="text-center py-4 bg-muted/50 rounded-md">
                            <p className="text-xs text-muted-foreground">Sensor data visual unavailable offline</p>
                        </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                        {config.buttonText && (
                            <Button asChild className="flex-1">
                                <Link href={`/dashboard/coach/${alert.coachId}?seat=${alert.seatId}`}>{config.buttonText}</Link>
                            </Button>
                        )}
                        <Button variant="ghost" className="flex-1 text-muted-foreground">Dismiss</Button>
                    </div>
                 </div>
            )})}
      </div>
    </>
  );
}
