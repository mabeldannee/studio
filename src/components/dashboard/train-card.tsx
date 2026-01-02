import Link from 'next/link';
import type { Train } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  Users,
  HelpCircle,
  XCircle,
  Siren,
  TrainFront,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface TrainCardProps {
  train: Train;
}

export function TrainCard({ train }: TrainCardProps) {
  const totalSeats = train.coaches.reduce((acc, coach) => acc + coach.seats.length, 0);
  const seatsByStatus = train.coaches
    .flatMap(c => c.seats)
    .reduce((acc, seat) => {
      acc[seat.status] = (acc[seat.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const coachGroups = train.coaches.reduce((acc, coach) => {
    const type = coach.coachNumber.charAt(0);
    if (!acc[type]) acc[type] = [];
    acc[type].push(coach);
    return acc;
  }, {} as Record<string, typeof train.coaches>);


  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrainFront className="h-5 w-5 text-primary" /> {train.trainNumber}
          </CardTitle>
          {train.alerts.length > 0 && (
            <div className="flex items-center gap-1 text-destructive font-semibold">
              <Siren className="h-4 w-4" />
              <span>{train.alerts.length}</span>
            </div>
          )}
        </div>
        <CardDescription>{train.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Journey Progress</span>
            <span>{train.journeyProgress}%</span>
          </div>
          <Progress value={train.journeyProgress} aria-label={`${train.journeyProgress}% complete`} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2 text-left">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <div className="font-semibold">{seatsByStatus['Ticket Verified'] || 0}</div>
                  <div className="text-xs text-muted-foreground">Verified</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Tickets Verified</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2 text-left">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="font-semibold">{seatsByStatus['Presence Confirmed'] || 0}</div>
                  <div className="text-xs text-muted-foreground">Presence</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Presence Confirmed</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2 text-left">
                <HelpCircle className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="font-semibold">{seatsByStatus['Unverified Presence'] || 0}</div>
                  <div className="text-xs text-muted-foreground">Unverified</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Unverified Presence</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2 text-left">
                <XCircle className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="font-semibold">{seatsByStatus['Likely Vacant'] || 0}</div>
                  <div className="text-xs text-muted-foreground">Vacant</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Likely Vacant</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
        <span className="text-xs font-semibold text-muted-foreground">COACHES</span>
         <div className="w-full flex flex-wrap gap-2">
          {Object.entries(coachGroups).map(([type, coaches]) => (
            <div key={type} className="flex gap-1 items-center">
              {coaches.map(coach => (
                <Button key={coach.id} variant="outline" size="sm" className="h-8 w-12" asChild>
                  <Link href={`/dashboard/coach/${coach.id}`}>{coach.coachNumber}</Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
