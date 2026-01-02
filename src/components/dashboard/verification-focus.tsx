
'use client';

import type { Train, Seat } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ArrowRight, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface VerificationFocusProps {
  trains: Train[];
}

type PrioritySeat = Seat & { trainNumber: string; coachId: string };

export function VerificationFocus({ trains }: VerificationFocusProps) {
  const allSeats: PrioritySeat[] = trains.flatMap(train =>
    train.coaches.flatMap(coach =>
      coach.seats.map(seat => ({
        ...seat,
        trainNumber: train.trainNumber,
        coachId: coach.id,
      }))
    )
  );

  const getPrioritySeats = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return allSeats
          .filter(
            s =>
              s.status === 'Presence Confirmed' &&
              (s.presenceConfidence === 'Late' || s.presenceConfidence === 'Anomalous')
          )
          .sort((a, b) => b.suspiciousPatternScore - a.suspiciousPatternScore);
      case 'Medium':
        return allSeats.filter(s => s.status === 'Unverified Presence');
      case 'Low':
        return allSeats.filter(s => s.status === 'Likely Vacant');
      default:
        return [];
    }
  };

  const highPrioritySeats = getPrioritySeats('High');
  const mediumPrioritySeats = getPrioritySeats('Medium');

  const renderSeatList = (seats: PrioritySeat[], max: number) => {
    if (seats.length === 0) {
      return <p className="text-sm text-muted-foreground">No seats match this priority.</p>;
    }
    return seats.slice(0, max).map(seat => (
      <div key={seat.id} className="flex items-center justify-between text-sm">
        <div>
          <span className="font-semibold">Seat {seat.seatNumber}</span>
          <span className="text-muted-foreground"> (Train {seat.trainNumber})</span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/coach/${seat.coachId}?seat=${seat.id}`}>
            View <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </div>
    ));
  };

  return (
    <Card className="lg:col-span-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-primary" />
          Verification Focus
        </CardTitle>
        <CardDescription>
          AI-prioritized seats for verification based on presence intelligence.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-5 w-5" /> High Priority
          </h3>
          <div className="space-y-2">{renderSeatList(highPrioritySeats, 3)}</div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" /> Medium Priority
          </h3>
          <div className="space-y-2">{renderSeatList(mediumPrioritySeats, 3)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
