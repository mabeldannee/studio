
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
import { Bot, Loader2, ShieldAlert, Check, AlertTriangle, UserCheck, HelpCircle, UserX, UserRoundCog } from 'lucide-react';
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
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl">Seat {seat.seatNumber.split('-').pop()} - {seat.berth}</SheetTitle>
          <SheetDescription>
            Coach {seat.seatNumber.split('-')[0]} - {seat.passenger?.class}
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 space-y-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  {passengerAvatar && <AvatarImage src={passengerAvatar.imageUrl} alt="Passenger" data-ai-hint={passengerAvatar.imageHint} />}
                  <AvatarFallback>{seat.passenger?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold text-lg">{seat.passenger?.name}</p>
                    <p className="text-sm text-muted-foreground">PNR: {seat.passenger?.pnr}</p>
                </div>
                 <Badge className={cn(statusBadgeVariants({ status: seat.status }), 'ml-auto')} variant="outline">
                    {seat.status}
                </Badge>
            </div>
             <Alert variant="warning" className="bg-orange-500/10 border-orange-500/20 text-orange-500">
                <AlertDescription>
                    Offline Mode: Changes will be queued and synced when online.
                </AlertDescription>
            </Alert>
        </div>

        <div className="py-6 px-6 space-y-6 flex-grow overflow-y-auto">
          
          {(isAiLoading || aiExplanation) && (
            <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    AI Intel
                </h4>
                {isAiLoading ? (
                    <div className="flex items-center text-sm text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Analyzing...</div>
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

           <div className='space-y-3'>
                <h4 className="text-sm font-semibold text-muted-foreground">Select Action</h4>
                <RadioGroup value={selectedAction} onValueChange={(v) => setSelectedAction(v as Action)}>
                    <Label htmlFor='action-verified' className={cn("flex items-center gap-3 p-3 rounded-lg border-2", selectedAction === 'Ticket Verified' ? "border-primary bg-primary/5" : "border-border")}>
                        <RadioGroupItem value="Ticket Verified" id="action-verified" />
                         <UserCheck className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-semibold">Ticket Verified</p>
                            <p className="text-xs text-muted-foreground">Passenger present, ID valid</p>
                        </div>
                    </Label>
                    <Label htmlFor='action-unauthorized' className={cn("flex items-center gap-3 p-3 rounded-lg border-2", selectedAction === 'Unauthorized' ? "border-primary bg-primary/5" : "border-border")}>
                        <RadioGroupItem value="Unauthorized" id="action-unauthorized" />
                        <UserX className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-semibold">Unauthorized</p>
                            <p className="text-xs text-muted-foreground">No ticket or invalid ticket</p>
                        </div>
                    </Label>
                    <Label htmlFor='action-reassigned' className={cn("flex items-center gap-3 p-3 rounded-lg border-2", selectedAction === 'Moved / Reassigned' ? "border-primary bg-primary/5" : "border-border")}>
                        <RadioGroupItem value="Moved / Reassigned" id="action-reassigned" />
                        <UserRoundCog className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-semibold">Moved / Reassigned</p>
                            <p className="text-xs text-muted-foreground">Swapped seats or upgraded</p>
                        </div>
                    </Label>
                </RadioGroup>
           </div>
           
            <div className='space-y-2'>
                 <h4 className="text-sm font-semibold text-muted-foreground">Remarks (Optional)</h4>
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
