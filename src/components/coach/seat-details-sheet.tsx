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
import type { Seat, SeatStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Clock, Bot, Ticket, Loader2, ShieldAlert, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { explainAlert } from '@/ai/flows/explain-alerts';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface SeatDetailsSheetProps {
  seat: Seat | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (seatId: string, status: SeatStatus) => void;
}

const statusBadgeVariants = cva('text-xs font-bold', {
  variants: {
    status: {
      'Ticket Verified': 'bg-green-100 text-green-800 border-green-300',
      'Presence Confirmed': 'bg-blue-100 text-blue-800 border-blue-300',
      'Unverified Presence': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Likely Vacant': 'bg-gray-100 text-gray-800 border-gray-300',
    },
  },
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
          });
          setAiExplanation(result.explanation);
        } catch (error) {
          console.error('Failed to get AI explanation:', error);
          setAiExplanation('AI explanation not available. Please verify passenger ticket and ID.');
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
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl">Seat {seat.seatNumber}</SheetTitle>
          <SheetDescription>
            View details and perform actions for this seat.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Current Status</h4>
            <Badge className={cn(statusBadgeVariants({ status: seat.status }))} variant="outline">
              {seat.status}
            </Badge>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
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
                            <AlertTitle>Action Required</AlertTitle>
                            <AlertDescription>{aiExplanation}</AlertDescription>
                        </Alert>
                    )
                )}
            </div>
          )}

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
