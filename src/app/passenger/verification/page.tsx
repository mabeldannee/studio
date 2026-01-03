
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Train, Bed, Info, CheckCircle, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function VerificationStatusPage() {
    const passengerAvatar = PlaceHolderImages.find(img => img.id === 'passenger-avatar');

    const [isPresenceConfirmed, setIsPresenceConfirmed] = useState(true);
    const [isTicketChecked, setIsTicketChecked] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-black shadow-lg">
                <header className="p-4 flex items-center bg-white dark:bg-black sticky top-0 z-10 border-b">
                    <Link href="/passenger/overview" passHref>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                    <h1 className="font-bold text-lg text-center flex-grow">Verification Status</h1>
                    <div className="w-10"></div>
                </header>

                <main className="p-4 space-y-6">
                    <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">PASSENGER DETAILS</p>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <Avatar className="h-14 w-14">
                                    {passengerAvatar && (
                                        <AvatarImage 
                                            src={passengerAvatar.imageUrl} 
                                            alt="Passenger avatar" 
                                            data-ai-hint={passengerAvatar.imageHint}
                                        />
                                    )}
                                    <AvatarFallback>RK</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h2 className="font-bold text-lg">Rajesh Kumar</h2>
                                        <Badge className="bg-green-100 text-green-800 border-green-300">CNF</Badge>
                                    </div>
                                    <p className="text-muted-foreground text-sm">PNR: 8203491234</p>
                                    <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
                                        <div className="flex items-center gap-1.5">
                                            <Train className="h-4 w-4" />
                                            <span>12951</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Bed className="h-4 w-4" />
                                            <span>B1-42</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                     <div>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-semibold text-muted-foreground">CURRENT STATUS</p>
                            <p className="text-xs text-muted-foreground">Updated 2m ago</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className={`p-4 flex flex-col items-center justify-center text-center gap-2 ${isPresenceConfirmed ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : ''}`}>
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isPresenceConfirmed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100'}`}>
                                    <CheckCircle className={`h-6 w-6 ${isPresenceConfirmed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                                </div>
                                <p className="font-semibold">Presence</p>
                                <p className={`text-sm font-bold ${isPresenceConfirmed ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                                    {isPresenceConfirmed ? 'Confirmed' : 'Not Confirmed'}
                                </p>
                            </Card>
                             <Card className={`p-4 flex flex-col items-center justify-center text-center gap-2 ${isTicketChecked ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800'}`}>
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isTicketChecked ? 'bg-green-100' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                                    {isTicketChecked ? (
                                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <MoreHorizontal className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                    )}
                                </div>
                                <p className="font-semibold">Ticket Check</p>
                                <p className={`text-sm font-bold ${isTicketChecked ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                    {isTicketChecked ? 'Verified' : 'Pending'}
                                </p>
                            </Card>
                        </div>
                    </div>
                    
                    <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-blue-900 dark:text-blue-200">Verification Process</h3>
                                    <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                                        This app check-in is optional. The Travelling Ticket Examiner (TTE) will physically verify your documents during the journey.
                                    </p>
                                    <Button variant="link" className="p-0 h-auto mt-3 text-blue-600 dark:text-blue-400 font-bold">
                                        How verification works <ArrowRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </main>
            </div>
        </div>
    );
}
