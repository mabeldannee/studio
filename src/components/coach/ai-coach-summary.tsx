"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, BarChart, CheckCircle, Users, HelpCircle, XCircle } from 'lucide-react';
import { aiSummarizeCoach } from '@/ai/flows/ai-summarize-coach';
import type { Coach, Seat } from '@/lib/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";

interface AISummaryProps {
  coach: Coach;
  seats: Seat[];
}

const chartConfig = {
  verified: {
    label: "Verified",
    color: "hsl(var(--chart-1))",
  },
  presence: {
    label: "Presence",
    color: "hsl(var(--chart-2))",
  },
  unverified: {
    label: "Unverified",
    color: "hsl(var(--chart-4))",
  },
  vacant: {
    label: "Vacant",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig;


export function AISummary({ coach, seats }: AISummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const seatsByStatus = useMemo(() => {
    return seats.reduce((acc, seat) => {
      acc[seat.status] = (acc[seat.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [seats]);


  const chartData = useMemo(() => [
    {
      status: "Seats",
      verified: seatsByStatus['Ticket Verified'] || 0,
      presence: seatsByStatus['Presence Confirmed'] || 0,
      unverified: seatsByStatus['Unverified Presence'] || 0,
      vacant: seatsByStatus['Likely Vacant'] || 0,
    },
  ], [seatsByStatus]);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const verifiedCount = seatsByStatus['Ticket Verified'] || 0;
        const presenceCount = seatsByStatus['Presence Confirmed'] || 0;

        const coachOverview = `Coach ${coach.coachNumber} has an occupancy of ${coach.occupancy}%. Verified: ${verifiedCount}, Presence Confirmed: ${presenceCount}.`;
        const riskHotspots = `High-risk seats are those with 'Presence Confirmed' status. There are ${presenceCount} such seats.`;
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
  }, [coach.coachNumber, coach.occupancy, seatsByStatus]);

  return (
    <>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-primary" />
            AI Coach Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{summary}</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
            <CardDescription>Occupancy</CardDescription>
            <CardTitle className="text-3xl">{coach.occupancy}%</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[50px] w-full">
                <RechartsBarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 0, right: 0, top:0, bottom: 0}}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="status" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="verified" stackId="a" fill="var(--color-verified)" radius={[5,0,0,5]} />
                    <Bar dataKey="presence" stackId="a" fill="var(--color-presence)" />
                    <Bar dataKey="unverified" stackId="a" fill="var(--color-unverified)" />
                    <Bar dataKey="vacant" stackId="a" fill="var(--color-vacant)" radius={[0,5,5,0]} />
                </RechartsBarChart>
            </ChartContainer>
        </CardContent>
      </Card>

      <Card>
         <CardHeader className="pb-2">
            <CardDescription>Hotspots</CardDescription>
            <CardTitle className="text-3xl text-destructive">{seatsByStatus['Presence Confirmed'] || 0}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-xs text-muted-foreground">Seats with unverified presence.</div>
        </CardContent>
      </Card>
    </>
  );
}
