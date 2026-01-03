
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Snooze } from 'lucide-react';
import type { ServiceRequest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AcknowledgeRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  request: ServiceRequest;
  onAcknowledge: () => void;
  onSnooze: (minutes: number) => void;
}

export function AcknowledgeRequestDialog({
  isOpen,
  onOpenChange,
  request,
  onAcknowledge,
  onSnooze,
}: AcknowledgeRequestDialogProps) {
  const { toast } = useToast();

  const handleAcknowledge = () => {
    onAcknowledge();
    toast({
      title: 'Request Acknowledged',
      description: `Request for seat ${request.seatId.split('-').pop()} is now "In Progress".`,
    });
    onOpenChange(false);
  };

  const handleSnooze = (minutes: number) => {
    onSnooze(minutes);
    toast({
      title: 'Request Snoozed',
      description: `Request for seat ${request.seatId.split('-').pop()} has been snoozed for ${minutes} minutes.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader>
          <DialogTitle>Acknowledge Request</DialogTitle>
          <DialogDescription>
            Acknowledge this request to mark it as "In Progress" or snooze it for later.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2">
            <p><span className="font-semibold">Seat:</span> {request.seatId}</p>
            <p><span className="font-semibold">Type:</span> {request.type}</p>
            {request.details && <p><span className="font-semibold">Details:</span> {request.details}</p>}
        </div>
        <DialogFooter className="grid grid-cols-1 sm:grid-cols-1 gap-2">
          <Button onClick={handleAcknowledge} className='w-full'>
            <Check className="mr-2 h-4 w-4" /> Acknowledge Now
          </Button>
          <div className="grid grid-cols-3 gap-2">
             <Button variant="outline" onClick={() => handleSnooze(10)}>
                <Snooze className="mr-2 h-4 w-4" /> 10 min
             </Button>
             <Button variant="outline" onClick={() => handleSnooze(20)}>
                <Snooze className="mr-2 h-4 w-4" /> 20 min
             </Button>
             <Button variant="outline" onClick={() => handleSnooze(30)}>
                <Snooze className="mr-2 h-4 w-4" /> 30 min
             </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
