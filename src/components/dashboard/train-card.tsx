
import Link from 'next/link';
import type { Coach } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, Users, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

interface TrainCardProps {
  coach: Coach;
}

const getStatus = (coach: Coach) => {
    const highAlerts = coach.seats.filter(s => s.alert && s.alert.urgency === 'high').length;
    const pendingCount = coach.seats.filter(s => s.status === 'Presence Confirmed' || s.status === 'Unverified Presence').length;

    if (coach.occupancy > 98) {
         return {
            label: 'Conflict Detected',
            Icon: AlertTriangle,
            color: 'text-red-400',
            bgColor: 'bg-red-900/50',
            borderColor: 'border-red-400/50'
        };
    }

    if (highAlerts > 0) {
        return {
            label: `${pendingCount} Pending`,
            Icon: AlertCircle,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-900/50',
            borderColor: 'border-yellow-400/50'
        };
    }
    
    if (pendingCount > 0) {
        return {
            label: `${pendingCount} Pending`,
            Icon: AlertCircle,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-900/50',
            borderColor: 'border-yellow-400/50'
        };
    }

    return {
        label: 'Verified',
        Icon: CheckCircle,
        color: 'text-green-400',
        bgColor: 'bg-green-900/50',
        borderColor: 'border-green-400/50'
    };
}


export function TrainCard({ coach }: TrainCardProps) {
    const status = getStatus(coach);

  return (
    <Link href={`/dashboard/coach/${coach.id}`} passHref>
        <Card className={cn("bg-card text-card-foreground border-2 transition-all hover:border-primary cursor-pointer flex flex-col justify-between h-full", status.borderColor)}>
            <div>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-bold">{coach.coachNumber}</CardTitle>
                    <status.Icon className={cn("h-5 w-5", status.color)} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{coach.occupancy}% <span className="text-sm font-normal text-muted-foreground">Full</span></div>
                </CardContent>
            </div>
            <CardFooter className="pt-4">
                 <p className={cn("text-xs font-semibold", status.color)}>{status.label}</p>
            </CardFooter>
        </Card>
    </Link>
  );
}
