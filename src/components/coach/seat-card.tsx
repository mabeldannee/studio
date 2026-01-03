
"use client";

import { cva, type VariantProps } from 'class-variance-authority';
import type { Seat } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, AlertTriangle, User, UserCheck, Ticket, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const seatVariants = cva(
  'w-full aspect-[4/5] flex flex-col items-center justify-center rounded-md p-1 text-sm border-2 transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 relative',
  {
    variants: {
      status: {
        'Ticket Verified': 'bg-green-500/10 border-green-500/30 text-green-400',
        'Presence Confirmed': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        'Unverified Presence': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
        'Likely Vacant': 'bg-muted/50 border-border text-muted-foreground',
      },
    },
  }
);

const statusIcons = {
    'Ticket Verified': <UserCheck className="h-4 w-4" />,
    'Presence Confirmed': <User className="h-4 w-4" />,
    'Unverified Presence': <Ticket className="h-4 w-4" />,
    'Likely Vacant': <X className="h-4 w-4" />,
}

interface SeatCardProps extends VariantProps<typeof seatVariants> {
  seat: Seat;
  onSelect: (seat: Seat) => void;
}

export function SeatCard({ seat, onSelect }: SeatCardProps) {
  const seatNumberOnly = seat.seatNumber.split('-').pop() || '';
  return (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                onClick={() => onSelect(seat)}
                className={cn(seatVariants({ status: seat.status }))}
                aria-label={`Seat ${seat.seatNumber}, Status: ${seat.status}`}
                >
                <div className="flex justify-between w-full px-1">
                    <p className="font-bold text-base">{seatNumberOnly}</p>
                    {seat.berth && <p className="text-xs">{seat.berth}</p>}
                </div>
                <div className="flex-grow flex flex-col items-center justify-center">
                    {statusIcons[seat.status]}
                </div>
                <div className="text-xs truncate w-full px-1 text-center font-mono">{seat.passenger?.name || '...'}</div>
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-bold">Seat {seat.seatNumber}</p>
                <p>Status: {seat.status}</p>
                {seat.passenger && <p>Passenger: {seat.passenger.name}</p>}
                {seat.lastUpdated && <p>Updated: {formatDistanceToNow(new Date(seat.lastUpdated), { addSuffix: true })}</p>}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
}
