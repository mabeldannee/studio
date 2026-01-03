
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  User,
  Train,
  Utensils,
  Sparkles,
  PlusSquare,
  Headset,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ConfirmPresenceDialog } from '@/components/passenger/confirm-presence-dialog';
import { ServiceRequestDialog } from '@/components/passenger/service-request-dialog';
import type { ServiceRequestType } from '@/lib/types';

export default function PassengerDashboardPage() {
  const [isPresenceConfirmed, setIsPresenceConfirmed] = useState(false);
  const [isConfirmingPresence, setIsConfirmingPresence] = useState(false);
  const [isRequestingService, setIsRequestingService] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceRequestType | null>(null);

  const handleConfirmOnboard = () => {
    setIsConfirmingPresence(true);
  };

  const handlePresenceConfirmed = () => {
    setIsPresenceConfirmed(true);
  };

  const handleServiceRequest = (type: ServiceRequestType) => {
    setServiceType(type);
    setIsRequestingService(true);
  };

  const handleServiceRequestClose = () => {
    setIsRequestingService(false);
    setServiceType(null);
  };

  const serviceButtons: { type: ServiceRequestType; icon: React.ElementType; label: string }[] = [
      { type: 'Food', icon: Utensils, label: 'Food' },
      { type: 'Clean', icon: Sparkles, label: 'Clean' },
      { type: 'Medical', icon: PlusSquare, label: 'Medical' },
      { type: 'Help', icon: Headset, label: 'Help' },
  ]


  return (
    <>
    <div className="min-h-screen bg-muted/30 flex justify-center">
      <div className="w-full max-w-md bg-background shadow-lg">
        <header className="p-4 flex justify-between items-center bg-background sticky top-0 z-10 border-b">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Train No. 12951</p>
            <h1 className="font-bold text-lg">Rajdhani Express</h1>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <User className="h-6 w-6 text-primary" />
          </Button>
        </header>

        <main className="p-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <p className="font-semibold text-green-400">On Time</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Updated 2m ago</p>
                </div>
                <Badge variant="outline">120 km/h</Badge>
              </div>

              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border"></div>

                <div className="space-y-6">
                  {/* Surat */}
                  <div className="flex items-start gap-4 relative">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full mt-1.5 ml-[12px] z-10"></div>
                    <div className="flex-grow">
                      <p className="font-semibold">Surat (ST)</p>
                      <p className="text-sm text-muted-foreground">Departed</p>
                    </div>
                    <p className="text-sm text-muted-foreground">14:20</p>
                  </div>

                  {/* Vadodara */}
                  <div className="flex items-center gap-4 relative">
                    <div className="bg-primary rounded-full p-1.5 ml-[6px] z-10 ring-4 ring-primary/20">
                      <Train className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-primary text-lg">
                        Vadodara Jn (BRC)
                      </p>
                      <p className="text-sm text-primary">Arriving Soon</p>
                    </div>
                    <p className="text-sm font-semibold text-primary">15m</p>
                  </div>

                  {/* Ratlam */}
                  <div className="flex items-start gap-4 relative">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full mt-1.5 ml-[12px] z-10"></div>
                    <div className="flex-grow">
                      <p className="font-semibold">Ratlam Jn (RTM)</p>
                      <p className="text-sm text-muted-foreground">Next Stop</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-muted-foreground">YOUR SEAT DETAILS</p>
                <Link href="/passenger/verification" passHref>
                  <Button variant="link" className="p-0 h-auto text-primary">View Ticket</Button>
                </Link>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <h2 className="text-5xl font-bold">B3</h2>
                <Separator orientation="vertical" className="h-10 w-px bg-border" />
                <h2 className="text-5xl font-bold">45</h2>
                <Badge variant="secondary" className="self-center">Lower Berth</Badge>
              </div>
              {isPresenceConfirmed ? (
                <div className="bg-green-500/10 text-green-400 font-semibold text-sm p-2 rounded-md flex items-center justify-center gap-2 border border-green-500/20">
                   <Check className="h-4 w-4" />
                   Presence Confirmed
                </div>
              ): (
                <div className="bg-yellow-500/10 text-yellow-400 font-semibold text-sm p-2 rounded-md flex items-center justify-center gap-2 border border-yellow-500/20">
                   <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                    Presence Not Confirmed
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
             <CardContent className="p-4">
                 <p className="text-sm font-semibold text-muted-foreground mb-3">ONBOARD SERVICES</p>
                 <div className="grid grid-cols-4 gap-2 text-center">
                    {serviceButtons.map(service => (
                        <button key={service.type} onClick={() => handleServiceRequest(service.type)} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                            <service.icon className="h-6 w-6 text-primary" />
                            <span className="text-xs">{service.label}</span>
                        </button>
                    ))}
                 </div>
             </CardContent>
          </Card>

          <div className="pt-2">
            <Button 
                className="w-full text-base py-6 font-bold"
                onClick={handleConfirmOnboard}
                disabled={isPresenceConfirmed}
            >
              <Check className="mr-2 h-5 w-5" />
              {isPresenceConfirmed ? 'Presence Confirmed' : "Confirm I'm Onboard"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2 px-4">
              Helping TTEs manage occupancy. Optional. Does not replace physical ticket checking.
            </p>
          </div>
        </main>
      </div>
    </div>
    <ConfirmPresenceDialog
        isOpen={isConfirmingPresence}
        onOpenChange={setIsConfirmingPresence}
        onConfirm={handlePresenceConfirmed}
    />
    <ServiceRequestDialog
        isOpen={isRequestingService}
        onOpenChange={handleServiceRequestClose}
        serviceType={serviceType}
    />
    </>
  );
}
