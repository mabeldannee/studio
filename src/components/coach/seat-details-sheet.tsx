
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
import { Bot, Loader2, ShieldAlert, Check, AlertTriangle, UserCheck, HelpCircle, UserX, UserRoundCog, Ban, Replace, WifiOff, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { explainAlert } from '@/ai/flows/explain-alerts';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

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

type Action = 'Ticket Verified' | 'Unauthorized' | 'Moved / Reassigned';

export function SeatDetailsSheet({ seat, isOpen, onOpenChange, onUpdateStatus }: SeatDetailsSheetProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action>('Ticket Verified');
  const passengerAvatar = PlaceHolderImages.find(img => img.id === 'passenger-avatar');

  useEffect(() => {
    if (seat && (seat.status === 'Presence Confirmed' || seat.status === 'Unverified Presence')) {
      const getExplanation = async () => {
        setIsAiLoading(true);
        setAiExplanation(null);
        try {
          const alertType = seat.alert?.type || 'Presence Confirmed but Ticket Unverified';
          const result = await explainAlert({
            alertType: alertType,
            seatNumber: seat.seatNumber,
            coachNumber: seat.seatNumber.split('-')[0],
            additionalContext: seat.alert?.description || `Presence confirmed with '${seat.presenceConfidence}' confidence.`,
            presenceTiming: seat.presenceConfidence,
          });
          setAiExplanation(result.explanation);
        } catch (error) {
          console.error('Failed to get AI explanation:', error);
          setAiExplanation('AI explanation not available. Please verify passenger ticket and ID manually.');
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

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    let newStatus: SeatStatus = 'Ticket Verified';
    if (selectedAction === 'Unauthorized') newStatus = 'Unverified Presence';
    if (selectedAction === 'Moved / Reassigned') newStatus = 'Likely Vacant';
    
    await new Promise(res => setTimeout(res, 750)); // Simulate API call
    onUpdateStatus(seat.id, newStatus);
    setIsUpdating(false);
    onOpenChange(false);
  };
  
  const actionIcons = {
      'Ticket Verified': UserCheck,
      'Unauthorized': Ban,
      'Moved / Reassigned': Replace,
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-2">
          <SheetTitle className="text-2xl">Seat {seat.seatNumber.split('-').pop()} - {seat.berth}</SheetTitle>
          <SheetDescription>
            Coach {seat.seatNumber.split('-')[0]} - {seat.passenger?.class}
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 pb-6 space-y-4 border-b">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary"/>
                </div>
                <div>
                    <p className="font-bold text-lg">{seat.passenger?.name}</p>
                    <p className="text-sm text-muted-foreground">PNR: {seat.passenger?.pnr}</p>
                </div>
                 <div className="text-right ml-auto">
                    <p className="font-bold text-lg">{seat.passenger?.age} {seat.passenger?.gender}</p>
                    <p className="text-sm text-muted-foreground">CNF</p>
                 </div>
            </div>
             <Alert variant="default" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-400">
                <WifiOff className="h-4 w-4 text-yellow-400" />
                <AlertTitle>Offline Mode</AlertTitle>
                <AlertDescription>
                    Changes will be queued and synced when online.
                </AlertDescription>
            </Alert>
        </div>

        <div className="py-6 px-6 space-y-6 flex-grow overflow-y-auto">
           <div className='space-y-3'>
                <h4 className="text-sm font-semibold text-muted-foreground">SELECT ACTION</h4>
                <RadioGroup value={selectedAction} onValueChange={(v) => setSelectedAction(v as Action)}>
                    <Label htmlFor='action-verified' className={cn("flex items-center gap-3 p-3 rounded-lg border-2", selectedAction === 'Ticket Verified' ? "border-primary bg-primary/5" : "border-border")}>
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", selectedAction === 'Ticket Verified' ? "bg-green-500" : "bg-muted")}>
                           <UserCheck className={cn("h-5 w-5", selectedAction === 'Ticket Verified' ? "text-white" : "text-muted-foreground")} />
                        </div>
                        <div>
                            <p className="font-semibold">Ticket Verified</p>
                            <p className="text-xs text-muted-foreground">Passenger present, ID valid</p>
                        </div>
                        <RadioGroupItem value="Ticket Verified" id="action-verified" className='ml-auto' />
                    </Label>
                    <Label htmlFor='action-unauthorized' className={cn("flex items-center gap-3 p-3 rounded-lg border-2", selectedAction === 'Unauthorized' ? "border-primary bg-primary/5" : "border-border")}>
                         <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", selectedAction === 'Unauthorized' ? "bg-red-500" : "bg-muted")}>
                           <Ban className={cn("h-5 w-5", selectedAction === 'Unauthorized' ? "text-white" : "text-muted-foreground")} />
                        </div>
                        <div>
                            <p className="font-semibold">Unauthorized</p>
                            <p className="text-xs text-muted-foreground">No ticket or invalid ticket</p>
                        </div>
                        <RadioGroupItem value="Unauthorized" id="action-unauthorized" className='ml-auto' />
                    </Label>
                    <Label htmlFor='action-reassigned' className={cn("flex items-center gap-3 p-3 rounded-lg border-2", selectedAction === 'Moved / Reassigned' ? "border-primary bg-primary/5" : "border-border")}>
                         <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", selectedAction === 'Moved / Reassigned' ? "bg-yellow-500" : "bg-muted")}>
                           <Replace className={cn("h-5 w-5", selectedAction === 'Moved / Reassigned' ? "text-white" : "text-muted-foreground")} />
                        </div>
                        <div>
                            <p className="font-semibold">Moved / Reassigned</p>
                            <p className="text-xs text-muted-foreground">Swapped seats or upgraded</p>
                        </div>
                        <RadioGroupItem value="Moved / Reassigned" id="action-reassigned" className='ml-auto' />
                    </Label>
                </RadioGroup>
           </div>
           
            <div className='space-y-2'>
                 <h4 className="text-sm font-semibold text-muted-foreground">REMARKS (OPTIONAL)</h4>
                 <Textarea placeholder="e.g., Fine collected, ID mismatch details..." />
            </div>

        </div>
        <SheetFooter className="p-4 bg-card border-t">
            <Button onClick={handleUpdateStatus} disabled={isUpdating} className="w-full text-lg py-6">
                {isUpdating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Check className="mr-2 h-4 w-4" />
                )}
                Update Seat Status
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
