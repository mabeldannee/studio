
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Check, Utensils, Sparkles, PlusSquare, Headset } from 'lucide-react';
import type { ServiceRequestType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


interface ServiceRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  serviceType: ServiceRequestType | null;
}

const serviceDetails = {
    Food: { icon: Utensils, title: "Food & Pantry", description: "Request assistance from the pantry car staff.", placeholder: "e.g., Requesting menu, water bottle..." },
    Clean: { icon: Sparkles, title: "Cleanliness Request", description: "Report a cleanliness issue in your coach.", placeholder: "e.g., Spillage on floor near seat, dustbin overflowing..." },
    Medical: { icon: PlusSquare, title: "Medical Assistance", description: "Request first-aid or medical help.", placeholder: "e.g., Feeling unwell, need basic first-aid..." },
    Help: { icon: Headset, title: "General Assistance", description: "Request help from onboard staff.", placeholder: "e.g., Luggage assistance, information about the journey..." },
}

export function ServiceRequestDialog({
  isOpen,
  onOpenChange,
  serviceType,
}: ServiceRequestDialogProps) {
  const [step, setStep] = useState<'initial' | 'confirmed'>('initial');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep('confirmed');
    toast({
        title: "Request Submitted",
        description: `Your ${serviceType} request has been sent to the onboard staff.`,
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state for next time it opens
    setTimeout(() => {
        setStep('initial');
        setDetails('');
    }, 300);
  };
  
  if (!serviceType) return null;

  const { icon: Icon, title, description, placeholder } = serviceDetails[serviceType];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-8">
        {step === 'initial' && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-xl text-center">{title}</DialogTitle>
              <DialogDescription className="text-center pt-2">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Textarea 
                    placeholder={`Optional: Provide more details. ${placeholder}`}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={3}
                />
            </div>
            <DialogFooter>
              <Button
                className="w-full text-base py-6"
                disabled={isLoading}
                onClick={handleConfirm}
              >
                 {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : `Submit ${serviceType} Request`}
              </Button>
            </DialogFooter>
          </>
        )}
        {step === 'confirmed' && (
            <div className="flex flex-col items-center justify-center py-8">
                 <div className="bg-green-600 p-4 rounded-full mb-6">
                  <Check className="h-8 w-8 text-white" />
              </div>
                <h2 className="text-xl font-bold mb-2">Request Sent</h2>
                <p className="text-muted-foreground text-center mb-6">
                    Onboard staff have been notified. They will attend to your request shortly.
                </p>
                <Button variant="outline" className="w-full py-6" onClick={handleClose}>Close</Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
