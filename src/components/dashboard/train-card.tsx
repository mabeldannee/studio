import Link from 'next/link';
import type { Coach } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrainCardProps {
  coach: Coach;
}

const getStatus = (coach: Coach) => {
    const highAlerts = coach.seats.filter(s => s.status === 'Presence Confirmed' && (s.presenceConfidence === 'Anomalous' || s.presenceConfidence === 'Late')).length;
    if (highAlerts > 0) {
        return {
            label: `${highAlerts} Pending`,
            Icon: AlertTriangle,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-900/50',
            borderColor: 'border-yellow-400/50'
        };
    }
    const unverified = coach.seats.filter(s => s.status === 'Unverified Presence').length;
    if (unverified > 0) {
         return {
            label: `${unverified} Pending`,
            Icon: AlertTriangle,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-900/50',
            borderColor: 'border-yellow-400/50'
        };
    }
    if (coach.occupancy > 98) {
         return {
            label: 'Conflict Detected',
            Icon: AlertTriangle,
            color: 'text-red-400',
            bgColor: 'bg-red-900/50',
            borderColor: 'border-red-400/50'
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
        <Card className={cn("bg-card text-card-foreground border-2 transition-all hover:border-primary/80 cursor-pointer", status.borderColor)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold">{coach.coachNumber}</CardTitle>
            <status.Icon className={cn("h-6 w-6", status.color)} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{coach.occupancy}% Full</div>
            <p className="text-xs" style={{ color: status.color }}>{status.label}</p>
        </CardContent>
        </Card>
    </Link>
  );
}
