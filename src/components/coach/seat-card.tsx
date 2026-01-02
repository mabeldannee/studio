"use client";

import { cva, type VariantProps } from 'class-variance-authority';
import type { Seat } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const seatVariants = cva(
  'w-full aspect-square flex items-center justify-center rounded-md font-bold text-sm border-2 transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 relative',
  {
    variants: {
      status: {
        'Ticket Verified': 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300',
        'Presence Confirmed': 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-300',
        'Unverified Presence': 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-700 dark:text-yellow-300',
        'Likely Vacant': 'bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-400',
      },
    },
  }
);

const confidenceIndicator = {
    'Early': <Clock className="h-3 w-3 text-blue-600" />,
    'Late': <Clock className="h-3 w-3 text-orange-500" />,
    'Anomalous': <AlertTriangle className="h-3 w-3 text-red-500" />,
}

interface SeatCardProps extends VariantProps<typeof seatVariants> {
  seat: Seat;
  onSelect: (seat: Seat) => void;
}

export function SeatCard({ seat, onSelect }: SeatCardProps) {
  const seatNumberOnly = seat.seatNumber.split('-').pop() || '';
  return (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                onClick={() => onSelect(seat)}
                className={cn(seatVariants({ status: seat.status }))}
                aria-label={`Seat ${seat.seatNumber}, Status: ${seat.status}`}
                >
                {seatNumberOnly}
                {seat.status === 'Presence Confirmed' && seat.presenceConfidence && (
                    <div className="absolute top-1 right-1">
                        {confidenceIndicator[seat.presenceConfidence]}
                    </div>
                )}
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-bold">Seat {seat.seatNumber}</p>
                <p>Status: {seat.status}</p>
                {seat.presenceConfidence && <p>Confidence: {seat.presenceConfidence}</p>}
                {seat.presenceTimestamp && <p>Time: {formatDistanceToNow(new Date(seat.presenceTimestamp), { addSuffix: true })}</p>}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
}
