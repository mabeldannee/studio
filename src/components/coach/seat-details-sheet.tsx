"use client";

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Seat, SeatStatus, PresenceConfidence } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Clock, Bot, Ticket, Loader2, ShieldAlert, Check, AlertTriangle, UserCheck, HelpCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { explainAlert } from '@/ai/flows/explain-alerts';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface SeatDetailsSheetProps {
  seat: Seat | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (seatId: string, status: SeatStatus) => void;
}

const statusBadgeVariants = cva('text-xs font-bold capitalize', {
  variants: {
    status: {
      'Ticket Verified': 'bg-green-100 text-green-800 border-green-300',
      'Presence Confirmed': 'bg-blue-100 text-blue-800 border-blue-300',
      'Unverified Presence': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Likely Vacant': 'bg-gray-100 text-gray-800 border-gray-300',
    },
  },
});

const confidenceBadgeVariants = cva('text-xs font-bold', {
    variants: {
        confidence: {
            'Early': 'bg-blue-100 text-blue-800 border-blue-300',
            'Late': 'bg-orange-100 text-orange-800 border-orange-300',
            'Anomalous': 'bg-red-100 text-red-800 border-red-300',
        }
    }
});


export function SeatDetailsSheet({ seat, isOpen, onOpenChange, onUpdateStatus }: SeatDetailsSheetProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (seat && seat.status === 'Presence Confirmed') {
      const getExplanation = async () => {
        setIsAiLoading(true);
        setAiExplanation(null);
        try {
          const result = await explainAlert({
            alertType: 'Presence Confirmed but Ticket Unverified',
            seatNumber: seat.seatNumber,
            coachNumber: seat.seatNumber.split('-')[0],
            additionalContext: `Presence confirmed with '${seat.presenceConfidence}' confidence. ${seat.presenceContext}.`,
            presenceTiming: seat.presenceConfidence,
          });
          setAiExplanation(result.explanation);
        } catch (error) {
          console.error('Failed to get AI explanation:', error);
          setAiExplanation('AI explanation not available. Please verify passenger ticket and ID. This alert highlights a verification need, not proof of invalid travel.');
        } finally {
          setIsAiLoading(false);
        }
      };
      getExplanation();
    } else {
      setAiExplanation(null);
      setIsAiLoading(false);
    }
  }, [seat]);

  if (!seat) {
    return null;
  }

  const handleVerifyTicket = async () => {
    setIsUpdating(true);
    await new Promise(res => setTimeout(res, 500)); // Simulate API call
    onUpdateStatus(seat.id, 'Ticket Verified');
    setIsUpdating(false);
    onOpenChange(false);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Seat {seat.seatNumber}</SheetTitle>
          <SheetDescription>
            View details and perform actions for this seat.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6 flex-grow">
          <div className='space-y-1'>
            <h4 className="text-sm font-semibold text-muted-foreground">Current Status</h4>
            <Badge className={cn(statusBadgeVariants({ status: seat.status }))} variant="outline">
              {seat.status}
            </Badge>
          </div>
          
          {seat.status === 'Presence Confirmed' && seat.presenceConfidence && (
            <div className='space-y-1'>
              <h4 className="text-sm font-semibold text-muted-foreground">Presence Intelligence</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn(confidenceBadgeVariants({ confidence: seat.presenceConfidence }))} variant="outline">
                   {seat.presenceConfidence}
                </Badge>
                {seat.presenceSource && <Badge variant="outline">{seat.presenceSource}</Badge>}
              </div>
              {seat.presenceTimestamp && (
                  <p className="text-xs text-muted-foreground pt-1">
                    Confirmed {formatDistanceToNow(new Date(seat.presenceTimestamp), { addSuffix: true })}
                </p>
              )}
               {seat.presenceContext && (
                  <p className="text-xs text-muted-foreground pt-1">
                    {seat.presenceContext}
                </p>
              )}
            </div>
          )}

          <div className='space-y-1'>
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last Updated
            </h4>
            <p className="text-sm">{formatDistanceToNow(new Date(seat.lastUpdated), { addSuffix: true })}</p>
          </div>

          {(isAiLoading || aiExplanation) && (
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    AI Intelligence
                </h4>
                {isAiLoading ? (
                    <div className="flex items-center text-sm text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generating AI explanation...</div>
                ) : (
                    aiExplanation && (
                        <Alert variant="destructive">
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Verification Recommended</AlertTitle>
                            <AlertDescription>{aiExplanation}</AlertDescription>
                        </Alert>
                    )
                )}
            </div>
          )}

        </div>
        <div className="bg-muted text-muted-foreground text-xs p-3 rounded-lg text-center">
            Presence indicates occupancy only. Ticket validity must be verified by the TTE.
        </div>
        <SheetFooter>
            {seat.status !== 'Ticket Verified' && (
                <Button onClick={handleVerifyTicket} disabled={isUpdating} className="w-full">
                    {isUpdating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Check className="mr-2 h-4 w-4" />
                    )}
                    Verify Ticket
                </Button>
            )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
