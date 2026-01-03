
"use client";

import type { Seat } from '@/lib/types';
import { SeatCard } from './seat-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { CheckCircle, Users, HelpCircle, XCircle, Clock, AlertTriangle, UserCheck, Ticket, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SeatGridProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  highlightedSeatId?: string;
}

const Bay = ({bayNumber, seats, onSeatSelect, highlightedSeatId}: {bayNumber: number, seats: Seat[], onSeatSelect: (seat: Seat) => void, highlightedSeatId?: string}) => {
    return (
        <div className="border-t pt-4">
            <p className="text-sm font-semibold mb-2">Bay {bayNumber}</p>
            <div className="grid grid-cols-8 gap-2">
                {seats.slice(0, 3).map(seat => <SeatCard key={seat.id} seat={seat} onSelect={onSeatSelect} isHighlighted={seat.id === highlightedSeatId} />)}
                <div className="col-span-2"></div>
                <div className="col-span-3 flex flex-col justify-end">
                     {seats.length > 6 && <SeatCard key={seats[6].id} seat={seats[6]} onSelect={onSeatSelect} isHighlighted={seats[6].id === highlightedSeatId} />}
                </div>

                {seats.slice(3, 6).map(seat => <SeatCard key={seat.id} seat={seat} onSelect={onSeatSelect} isHighlighted={seat.id === highlightedSeatId} />)}
                 <div className="col-span-2 row-start-2 self-center text-center text-xs text-muted-foreground writing-vertical-rl">AISLE</div>
                 <div className="col-span-3 row-start-2 flex flex-col justify-end">
                    {seats.length > 7 && <SeatCard key={seats[7].id} seat={seats[7]} onSelect={onSeatSelect} isHighlighted={seats[7].id === highlightedSeatId} />}
                 </div>
            </div>
        </div>
    )
}

const FilterView = () => (
    <div className="bg-card p-3 rounded-lg border">
        <p className="text-sm font-semibold mb-3">Filter View</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Verified</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-muted-foreground">Present</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span className="text-muted-foreground">Check</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                <span className="text-muted-foreground">Vacant</span>
            </div>
        </div>
    </div>
)

export function SeatGrid({ seats, onSeatSelect, highlightedSeatId }: SeatGridProps) {
  const bays = Array.from({ length: Math.ceil(seats.length / 8) }, (_, i) => seats.slice(i * 8, i * 8 + 8));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seat Layout</CardTitle>
        <CardDescription>
          Select a seat to view details and update status.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-4">
                 {bays.map((baySeats, i) => (
                    <Bay key={i} bayNumber={i + 1} seats={baySeats} onSeatSelect={onSeatSelect} highlightedSeatId={highlightedSeatId} />
                ))}
            </div>
            <div className="hidden md:block md:col-span-1">
                <FilterView />
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
