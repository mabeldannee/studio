
'use client';

import Link from 'next/link';
import { ArrowLeft, User, CheckCircle, Clock, Info, AlertTriangle, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function VerificationStatusPage() {
    return (
        <div className="min-h-screen bg-muted/30 flex justify-center">
            <div className="w-full max-w-md bg-background shadow-lg">
                <header className="p-4 bg-background sticky top-0 z-10 border-b">
                    <div className='relative flex items-center'>
                         <Link href="/passenger/overview" passHref className='absolute'>
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-6 w-6" />
                            </Button>
                        </Link>
                        <div className='text-center flex-grow'>
                            <h1 className="font-bold text-lg">Verification Status</h1>
                            <p className="text-sm text-muted-foreground">Passenger Details</p>
                        </div>
                    </div>
                </header>

                <main className="p-4 space-y-4">
                    <Card>
                        <CardContent className="p-4 space-y-4">
                           <div className='flex items-center gap-4'>
                                <div className='p-3 bg-primary/10 rounded-full'>
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className='flex-grow'>
                                    <p className='font-bold'>Rajesh Kumar</p>
                                    <p className='text-sm text-muted-foreground'>PNR: 8204591234</p>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-green-200">CNF</Badge>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Train</p>
                                    <p className="font-semibold">12951 - Rajdhani Express</p>
                                </div>
                                 <div className='text-right'>
                                    <p className="text-muted-foreground">Booking Date</p>
                                    <p className="font-semibold">28 Dec 2025</p>
                                </div>
                                 <div>
                                    <p className="text-muted-foreground">From</p>
                                    <p className="font-semibold">Mumbai Central</p>
                                </div>
                                 <div className='text-right'>
                                    <p className="text-muted-foreground">To</p>
                                    <p className="font-semibold">New Delhi</p>
                                </div>
                           </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader className='p-4 pb-0'>
                            <p className="font-semibold flex items-center gap-2"><BookOpen className='h-5 w-5 text-primary'/> Current Status</p>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-semibold">Presence</p>
                                        <p className="text-xs text-muted-foreground">Confirmed at 10:45 AM</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-green-600">Confirmed</p>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="font-semibold">Ticket Check</p>
                                        <p className="text-xs text-muted-foreground">Awaiting physical verification by TTE</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-orange-600">Pending</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className='p-4'>
                            <p className="font-semibold flex items-center gap-2"><Info className='h-5 w-5 text-primary'/> Verification Process</p>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-sm space-y-4">
                           <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="bg-green-600 rounded-full p-1.5">
                                        <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                    <div className="w-px h-12 bg-border"></div>
                                </div>
                                <div>
                                    <p className="font-semibold">Presence Confirmed</p>
                                    <p className="text-muted-foreground text-xs">This app check-in is optional. The Travelling Ticket Examiner (TTE) will physically verify your documents during the journey.</p>
                                </div>
                           </div>
                           <div className="flex items-start gap-4">
                               <div className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">2</div>
                               <div>
                                    <p className="font-semibold">TTE Verification</p>
                                    <p className="text-muted-foreground text-xs">The TTE will physically verify your ticket during the journey. Please keep your ticket and ID ready.</p>
                                </div>
                           </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold">Important</h3>
                                    <p className="text-xs text-yellow-800 mt-1">
                                        The TTE will physically verify your ticket during the journey. Presence confirmation in this app is informational only and does not replace official ticket verification.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger className="font-semibold text-sm rounded-lg hover:no-underline bg-card p-4 -mb-2">
                                How verification works
                            </AccordionTrigger>
                            <AccordionContent className="bg-card p-4 rounded-b-lg">
                                This section explains the two-step verification process, emphasizing the difference between digital presence confirmation and physical ticket validation by the TTE.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </main>
            </div>
        </div>
    );
}
