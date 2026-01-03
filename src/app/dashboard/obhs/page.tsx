
// src/app/dashboard/obhs/page.tsx
'use client';

import { trains } from '@/lib/data';
import type { Coach, ServiceRequest } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Utensils, Sparkles, PlusSquare, Headset, Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';


const serviceIcons = {
    Food: Utensils,
    Clean: Sparkles,
    Medical: PlusSquare,
    Help: Headset
};

const statusColors = {
    Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Acknowledged: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Completed: 'bg-green-500/20 text-green-400 border-green-500/30'
}

export default function ObhsDashboardPage() {
  const train = trains[0]; // Assuming one train for simplicity

  const getRequestsByCoach = (coach: Coach) => {
    return coach.serviceRequests.reduce((acc, req) => {
      if (!acc[req.type]) {
        acc[req.type] = 0;
      }
      if (req.status !== 'Completed') {
        acc[req.type]++;
      }
      return acc;
    }, {} as Record<ServiceRequest['type'], number>);
  };

  return (
    <div className="flex flex-col gap-6">
        <div>
            <p className="text-sm text-muted-foreground">Active Train</p>
            <h1 className="text-2xl font-bold">{train.trainNumber} - {train.name}</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Service Request Overview</CardTitle>
                <CardDescription>Summary of all pending and acknowledged requests by coach.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full space-y-3">
                    {train.coaches.map(coach => {
                        const requestsSummary = getRequestsByCoach(coach);
                        const totalPending = Object.values(requestsSummary).reduce((sum, count) => sum + count, 0);

                        if(totalPending === 0) return null;

                        return (
                            <AccordionItem value={coach.id} key={coach.id} className="border bg-card rounded-lg">
                                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                    <div className="flex justify-between items-center w-full">
                                        <h3 className="text-lg font-semibold">Coach {coach.coachNumber}</h3>
                                        <Badge variant={totalPending > 0 ? "destructive" : "secondary"}>{totalPending} Pending</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 border-t">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-muted-foreground">Pending Requests:</h4>
                                        {coach.serviceRequests.filter(r => r.status !== 'Completed').map(request => {
                                            const Icon = serviceIcons[request.type];
                                            return (
                                                <div key={request.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">{request.type} - Seat {request.seatId.split('-').pop()}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Raised {formatDistanceToNow(new Date(request.timeRaised), { addSuffix: true })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className={cn(statusColors[request.status])} variant="outline">{request.status}</Badge>
                                                         <Button size="sm" variant="outline" disabled={request.status === 'Acknowledged'}>
                                                            <Check className="h-4 w-4 mr-1" /> Acknowledge
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
