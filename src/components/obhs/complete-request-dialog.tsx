
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from 'lucide-react';
import type { ServiceRequest, CompletionReason } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CompleteRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  request: ServiceRequest;
  onComplete: (reason: CompletionReason) => void;
}

const completionReasons: CompletionReason[] = ['Service Provided', 'Handed Over at Station', 'Not Feasible Onboard'];

export function CompleteRequestDialog({
  isOpen,
  onOpenChange,
  request,
  onComplete,
}: CompleteRequestDialogProps) {
  const [reason, setReason] = useState<CompletionReason>('Service Provided');
  const { toast } = useToast();

  const handleComplete = () => {
    onComplete(reason);
    toast({
      title: 'Request Closed',
      description: `The service request for seat ${request.seatId.split('-').pop()} has been marked as closed.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <DialogHeader>
          <DialogTitle>Complete Service Request</DialogTitle>
          <DialogDescription>
            Select a reason for closing this request. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup defaultValue="Service Provided" onValueChange={(value) => setReason(value as CompletionReason)}>
            <div className="space-y-3">
              {completionReasons.map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <RadioGroupItem value={r!} id={r!} />
                  <Label htmlFor={r!}>{r}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handleComplete} className="w-full">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Closed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
