
'use client';
import { notFound, useRouter } from 'next/navigation';
import { findCoach, findTrain } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, MoreVertical, Search, Wifi, AlertTriangle, Check, CheckCircle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type CoachPageProps = {
  params: { id: string };
  searchParams: { [key:string]: string | string[] | undefined };
};

export default function CoachPage({ params }: CoachPageProps) {
  const router = useRouter();
  const coach = findCoach(params.id);

  if (!coach) {
    notFound();
  }

  const train = findTrain(coach.trainId);
  const initialSeatId = searchParams.seat as string | undefined;

  const passengers = [
      { id: 1, name: "Rajesh Kumar", pnr: "823-456-7890", route: "NDLS -> CNB", seat: "45", berth: "LOWER", status: "Pending" },
      { id: 2, name: "Sunita Devi", pnr: "823-999-1234", route: "NDLS -> HWH", seat: "46", berth: "MIDDLE", status: "Verified" },
      { id: 3, name: "Amit Singh", pnr: "823-111-2222", route: "CNB -> HWH", seat: "48", berth: "UPPER", status: "Present" },
      { id: 4, name: "Priya M.", pnr: "823-555-6666", seat: "49", berth: "SIDE L", status: "Not Boarded" },
      { id: 5, name: "Vikram Sethi", pnr: "823-777-8888", route: "NDLS -> CNB", seat: "50", berth: "SIDE U", status: "Pending" },
  ]


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
                <h1 className="text-xl font-bold">Coach {coach.coachNumber} - Sleeper</h1>
                <p className="text-xs text-muted-foreground">{train?.trainNumber} {train?.name}</p>
            </div>
        </div>
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </div>

        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
            <p className="font-bold flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Offline Mode Active</p>
            <p className="text-xs mt-1">Changes saved locally on device.</p>
            <div className="text-xs mt-2 flex justify-between items-center">
                <span>Last synced: Today, 10:45 AM</span>
                <button className="font-semibold">Reconnecting...</button>
            </div>
        </div>
        
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Seat, PNR or Name" className="pl-9" />
        </div>

        <div className="flex gap-2">
            <Button size="sm" className="rounded-full">All (72)</Button>
            <Button size="sm" variant="outline" className="rounded-full">Pending (28)</Button>
            <Button size="sm" variant="outline" className="rounded-full">Verified (44)</Button>
        </div>

        <div>
            <p className="text-sm text-muted-foreground mb-4">Showing {passengers.length} of 72</p>
            <div className="space-y-3">
                {passengers.map(p => (
                    <Card key={p.id} className="bg-card">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 text-center p-1 rounded-md ${p.status === 'Verified' ? 'bg-green-500/10 text-green-400' : p.status === "Present" ? 'bg-blue-500/10 text-blue-400' : 'bg-muted'}`}>
                                        <p className="font-bold text-lg">{p.seat}</p>
                                        <p className="text-xs font-semibold">{p.berth}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{p.name}</p>
                                        <p className="text-xs text-muted-foreground">PNR: {p.pnr} &#x2022; {p.route}</p>
                                    </div>
                                </div>
                                {p.status === "Verified" && <CheckCircle className="h-6 w-6 text-green-500" />}
                            </div>
                            <div className="mt-4">
                                {p.status === "Pending" && (
                                    <div className="flex items-center justify-between">
                                         <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                                            <div className="h-2 w-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
                                            Pending Verification
                                        </Badge>
                                        <Button size="sm">Verify</Button>
                                    </div>
                                )}
                                {p.status === "Present" && (
                                     <div className="flex items-center justify-between">
                                         <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                                            <Check className="h-3 w-3 mr-1.5"/> Marked Present <span className="text-muted-foreground ml-2">&#x2022; Local</span>
                                        </Badge>
                                        <Button size="sm" variant="ghost">Undo</Button>
                                    </div>
                                )}
                                {p.status === "Not Boarded" && (
                                    <div className="flex items-center justify-between">
                                        <Badge variant="destructive" className="bg-red-500/20 text-red-400">
                                           NOT BOARDED
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
            <div className="p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg border flex items-center justify-between">
                <p className="text-sm">2 updates queued</p>
                <Button size="sm">Sync Now</Button>
            </div>
        </div>
      
    </div>
  );
}
