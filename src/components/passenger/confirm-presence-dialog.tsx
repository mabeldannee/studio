
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
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Train } from 'lucide-react';

interface ConfirmPresenceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmPresenceDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: ConfirmPresenceDialogProps) {
  const [step, setStep] = useState<'initial' | 'confirmed'>('initial');
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setStep('confirmed');
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state for next time it opens
    setTimeout(() => {
        setStep('initial');
        setIsAcknowledged(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-8 text-center">
        {step === 'initial' && (
          <>
            <DialogHeader className="items-center">
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mb-4">
                  <Train className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-xl">Are you onboard?</DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                Confirming presence allows us to send you real-time journey
                updates. This only indicates that you are onboard the train.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-start space-x-3 bg-muted p-3 rounded-md my-6 text-left">
              <Checkbox
                id="terms"
                checked={isAcknowledged}
                onCheckedChange={(checked) =>
                  setIsAcknowledged(checked as boolean)
                }
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I understand this is not ticket verification
                </label>
                <p className="text-xs text-muted-foreground">
                  Ticket checking is performed separately by TTE.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-6"
                disabled={!isAcknowledged}
                onClick={handleConfirm}
              >
                Confirm Presence
              </Button>
            </DialogFooter>
          </>
        )}
        {step === 'confirmed' && (
            <div className="flex flex-col items-center justify-center py-8">
                 <div className="bg-green-600 p-4 rounded-full mb-6">
                  <Check className="h-8 w-8 text-white" />
              </div>
                <h2 className="text-xl font-bold mb-2">Presence Confirmed</h2>
                <p className="text-muted-foreground mb-6">
                    Have a safe journey! You will now receive location-based updates for your trip.
                </p>
                <Button variant="outline" className="w-full py-6" onClick={handleClose}>Close</Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
