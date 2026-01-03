// src/app/dashboard/obhs/page.tsx
'use client';
import { useState, useMemo, useEffect } from 'react';
import { trains } from '@/lib/data';
import type { Coach, ServiceRequest, ServiceRequestStatus, CompletionReason, ServiceRequestType } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, Sparkles, PlusSquare, Headset, Check, Clock, Shield, AlertTriangle, CheckCircle2, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { AcknowledgeRequestDialog } from '@/components/obhs/acknowledge-request-dialog';
import { CompleteRequestDialog } from '@/components/obhs/complete-request-dialog';

const serviceIcons = { Food: Utensils, Clean: Sparkles, Medical: PlusSquare, Help: Headset };
const statusColors: Record<ServiceRequestStatus, string> = {
    'Waiting for Action': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Closed': 'bg-green-500/20 text-green-400 border-green-500/30'
};

export default function ObhsDashboardPage() {
  const [allCoaches, setAllCoaches] = useState(trains[0].coaches);
  const [sortMethod, setSortMethod] = useState<'urgency' | 'time' | 'type'>('urgency');
  
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isAckDialogOpen, setAckDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setCompleteDialogOpen] = useState(false);


  const handleUpdateRequest = (reqId: string, updates: Partial<ServiceRequest>) => {
    setAllCoaches(prevCoaches =>
      prevCoaches.map(coach => ({
        ...coach,
        serviceRequests: coach.serviceRequests.map(req =>
          req.id === reqId ? { ...req, ...updates } : req
        ),
      }))
    );
  };

  const openCompleteDialog = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setCompleteDialogOpen(true);
  };

  const openAcknowledgeDialog = (request: ServiceRequest) => {
      setSelectedRequest(request);
      setAckDialogOpen(true);
  }

  const sortedCoaches = useMemo(() => {
    return allCoaches.map(coach => {
      const sortedRequests = [...coach.serviceRequests].sort((a, b) => {
        if (a.status === 'Closed' && b.status !== 'Closed') return 1;
        if (a.status !== 'Closed' && b.status === 'Closed') return -1;
        if (a.type === 'Medical' && b.type !== 'Medical') return -1;
        if (a.type !== 'Medical' && b.type === 'Medical') return 1;

        if (sortMethod === 'urgency') {
          const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        if (sortMethod === 'time') {
          return new Date(a.timeRaised).getTime() - new Date(b.timeRaised).getTime();
        }
        if (sortMethod === 'type') {
          return a.type.localeCompare(b.type);
        }
        return 0;
      });
      return { ...coach, serviceRequests: sortedRequests };
    });
  }, [allCoaches, sortMethod]);

  const getRequestsSummary = (coach: Coach) => {
    return coach.serviceRequests.reduce((acc, req) => {
      if (req.status !== 'Closed') {
        acc[req.type] = (acc[req.type] || 0) + 1;
      }
      return acc;
    }, {} as Record<ServiceRequestType, number>);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
          <div>
              <p className="text-sm text-muted-foreground">Active Train</p>
              <h1 className="text-2xl font-bold">{trains[0].trainNumber} - {trains[0].name}</h1>
          </div>

          <Card>
              <CardHeader>
                  <CardTitle>Service Request Dashboard</CardTitle>
                  <CardDescription>Review and manage passenger service requests across all coaches.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                      <p className="text-sm font-medium">Sort by:</p>
                      <Select value={sortMethod} onValueChange={(value) => setSortMethod(value as any)}>
                          <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select sort method" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="urgency">Urgency</SelectItem>
                              <SelectItem value="time">Time Raised</SelectItem>
                              <SelectItem value="type">Service Type</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                  <Accordion type="multiple" defaultValue={sortedCoaches.map(c => c.id)} className="w-full space-y-3">
                      {sortedCoaches.map(coach => {
                          const summary = getRequestsSummary(coach);
                          const totalPending = Object.values(summary).reduce((sum, count) => sum + count, 0);

                          if (totalPending === 0) return null;

                          return (
                              <AccordionItem value={coach.id} key={coach.id} className="border bg-card rounded-lg">
                                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                      <div className="flex justify-between items-center w-full">
                                          <div className="flex items-center gap-4">
                                            <h3 className="text-lg font-semibold">Coach {coach.coachNumber}</h3>
                                            <div className='hidden sm:flex items-center gap-3 text-xs'>
                                                {Object.entries(summary).map(([type, count]) => {
                                                    if(count === 0) return null;
                                                    const Icon = serviceIcons[type as ServiceRequestType];
                                                    return <div key={type} className='flex items-center gap-1.5'><Icon className='h-3 w-3'/> {count}</div>
                                                })}
                                            </div>
                                          </div>
                                          <Badge variant={totalPending > 0 ? "destructive" : "secondary"}>{totalPending} Pending</Badge>
                                      </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="p-4 border-t">
                                      <div className="space-y-4">
                                          {coach.serviceRequests.filter(r => r.status !== 'Closed').map(request => {
                                              const Icon = serviceIcons[request.type];
                                              const isSnoozed = request.snoozeUntil && new Date(request.snoozeUntil) > new Date();
                                              return (
                                                  <div key={request.id} className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-md bg-muted/50 gap-4", request.type === 'Medical' && "border-l-4 border-red-500")}>
                                                      <div className="flex items-center gap-3">
                                                          <Icon className={cn("h-5 w-5 text-primary", request.type === 'Medical' && "text-red-500")} />
                                                          <div>
                                                              <p className="font-semibold">{request.type} - Seat {request.seatId.split('-').pop()}</p>
                                                              <p className="text-xs text-muted-foreground">
                                                                  Raised {formatDistanceToNow(new Date(request.timeRaised), { addSuffix: true })}
                                                              </p>
                                                              {request.details && <p className="text-xs text-muted-foreground italic mt-1">"{request.details}"</p>}
                                                          </div>
                                                      </div>
                                                      <div className="flex items-center gap-2 self-end sm:self-center">
                                                          <Badge className={cn(statusColors[request.status])} variant="outline">{request.status}</Badge>
                                                          {isSnoozed && <Badge variant="outline"><History className="h-3 w-3 mr-1"/> Snoozed</Badge>}
                                                          <Button size="sm" variant="outline" onClick={() => openAcknowledgeDialog(request)} disabled={request.status !== 'Waiting for Action'}>
                                                              <Check className="h-4 w-4 mr-1" /> Acknowledge
                                                          </Button>
                                                          <Button size="sm" onClick={() => openCompleteDialog(request)}>
                                                            <CheckCircle2 className='h-4 w-4 mr-1' /> Close
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
           <Alert variant="default" className="mt-6 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">Privacy Guardrail</AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400 text-xs">
                    Passenger identity and ticket information are not visible to onboard staff. This system is for service request management only.
                </AlertDescription>
            </Alert>
      </div>
      {selectedRequest && (
        <>
            <AcknowledgeRequestDialog 
                isOpen={isAckDialogOpen}
                onOpenChange={setAckDialogOpen}
                request={selectedRequest}
                onAcknowledge={() => handleUpdateRequest(selectedRequest.id, { status: 'In Progress' })}
                onSnooze={(minutes) => handleUpdateRequest(selectedRequest.id, { status: 'In Progress', snoozeUntil: new Date(Date.now() + minutes * 60 * 1000).toISOString()})}
            />
            <CompleteRequestDialog
                isOpen={isCompleteDialogOpen}
                onOpenChange={setCompleteDialogOpen}
                request={selectedRequest}
                onComplete={(reason) => handleUpdateRequest(selectedRequest.id, { status: 'Closed', completionReason: reason })}
            />
        </>
      )}
    </>
  );
}
