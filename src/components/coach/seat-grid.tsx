"use client";

import type { Seat } from '@/lib/types';
import { SeatCard } from './seat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { CheckCircle, Users, HelpCircle, XCircle } from 'lucide-react';

interface SeatGridProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export function SeatGrid({ seats, onSeatSelect }: SeatGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seat Layout</CardTitle>
        <CardDescription>
          Select a seat to view details and perform actions. The layout is prioritized by AI.
        </CardDescription>
         <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-green-500" /> Ticket Verified</div>
            <div className="flex items-center gap-2"><Users className="h-3 w-3 text-blue-500" /> Presence Confirmed</div>
            <div className="flex items-center gap-2"><HelpCircle className="h-3 w-3 text-yellow-500" /> Unverified Presence</div>
            <div className="flex items-center gap-2"><XCircle className="h-3 w-3 text-gray-500" /> Likely Vacant</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {seats.map((seat) => (
            <SeatCard key={seat.id} seat={seat} onSelect={onSeatSelect} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
