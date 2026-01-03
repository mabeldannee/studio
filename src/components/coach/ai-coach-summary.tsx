
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, UserCheck, TicketCheck, XCircle, Users } from 'lucide-react';
import { aiSummarizeCoach } from '@/ai/flows/ai-summarize-coach';
import type { Coach, Seat } from '@/lib/types';

interface AISummaryProps {
  coach: Coach;
  seats: Seat[];
}

export function AISummary({ coach, seats }: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const seatsByStatus = useMemo(() => {
    return seats.reduce((acc, seat) => {
      acc[seat.status] = (acc[seat.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [seats]);


  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const verifiedCount = seatsByStatus['Ticket Verified'] || 0;
        const presenceCount = seatsByStatus['Presence Confirmed'] || 0;
        const unverifiedCount = seatsByStatus['Unverified Presence'] || 0;
        const vacantCount = seatsByStatus['Likely Vacant'] || 0;
        const totalSeats = seats.length;

        const coachOverview = `Coach ${coach.coachNumber} has ${totalSeats} total seats. Statuses: ${verifiedCount} verified, ${presenceCount} with confirmed presence, ${unverifiedCount} unverified, ${vacantCount} vacant.`;
        const riskHotspots = `High-risk seats are those with 'Presence Confirmed' or 'Unverified Presence' status. There are ${presenceCount + unverifiedCount} such seats.`;
        const suggestedCheckOrder = 'Prioritize seats with confirmed presence, then unverified, and finally vacant seats.';

        const result = await aiSummarizeCoach({
          coachOverview,
          riskHotspots,
          suggestedCheckOrder,
        });
        setSummary(result.summary);
      } catch (error) {
        console.error("Failed to get AI summary:", error);
        setSummary("Rule-based summary: Focus on seats with 'Presence Confirmed' first. The coach occupancy is " + coach.occupancy + "%.");
      }
      setIsLoading(false);
    };

    fetchSummary();
  }, [coach.coachNumber, coach.occupancy, seats, seatsByStatus]);
  
  const totalSeats = seats.length;
  const verifiedSeats = seatsByStatus['Ticket Verified'] || 0;
  const checkSeats = (seatsByStatus['Presence Confirmed'] || 0) + (seatsByStatus['Unverified Presence'] || 0);
  const vacantSeats = seatsByStatus['Likely Vacant'] || 0;

  return (
     <div className="grid grid-cols-4 gap-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">TOTAL</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalSeats}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-green-400">VERIFIED</CardTitle>
                <UserCheck className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{verifiedSeats}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-yellow-400">CHECK</CardTitle>
                <TicketCheck className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{checkSeats}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-red-400">VACANT</CardTitle>
                <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{vacantSeats}</div>
            </CardContent>
        </Card>
     </div>
  );
}
