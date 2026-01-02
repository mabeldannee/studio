"use client";

import { cva, type VariantProps } from 'class-variance-authority';
import type { Seat } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const seatVariants = cva(
  'w-full aspect-square flex items-center justify-center rounded-md font-bold text-sm border-2 transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      status: {
        'Ticket Verified': 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300',
        'Presence Confirmed': 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-300 animate-pulse',
        'Unverified Presence': 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-700 dark:text-yellow-300',
        'Likely Vacant': 'bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-400',
      },
    },
  }
);

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
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Seat {seat.seatNumber}</p>
                <p>Status: {seat.status}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
}
