"use client";

import { useState } from 'react';
import type { Seat } from '@/lib/types';
import { prioritizeSeats } from '@/ai/flows/smart-check-prioritization';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Loader2, Wand2 } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SmartCheckProps {
  seats: Seat[];
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
  occupancyRate: number;
}

export function SmartCheck({ seats, setSeats, occupancyRate }: SmartCheckProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handlePrioritize = async () => {
    setIsLoading(true);
    setExplanation(null);
    try {
      const seatsForAI = seats.map(s => ({
          seatNumber: s.seatNumber,
          isPresentConfirmed: s.status === 'Presence Confirmed',
          isTicketVerified: s.status === 'Ticket Verified',
          suspiciousPatternScore: s.suspiciousPatternScore,
      }));

      const result = await prioritizeSeats({ seats: seatsForAI, occupancyRate });
      
      const seatOrder = result.prioritizedSeats.map(s => s.seatNumber);
      const sortedSeats = [...seats].sort((a, b) => seatOrder.indexOf(a.seatNumber) - seatOrder.indexOf(b.seatNumber));
      
      setSeats(sortedSeats);
      setExplanation(result.explanation);
    } catch (error) {
      console.error("Failed to prioritize seats:", error);
      setExplanation("Could not get AI prioritization. Defaulting to standard order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h3 className="font-bold flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Smart Check Prioritization
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Let AI suggest the most efficient verification order for this coach.</p>
            </div>
            <Button onClick={handlePrioritize} disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Prioritize Checks
            </Button>
        </div>
        {explanation && (
            <Alert className="mt-4">
                <Bot className="h-4 w-4" />
                <AlertTitle className="font-semibold">AI Prioritization Logic</AlertTitle>
                <AlertDescription>{explanation} The seat grid below is now updated with this new order.</AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
