
'use client';
import { notFound, useRouter, useParams, useSearchParams } from 'next/navigation';
import { findCoach, findTrain } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, MoreVertical, Search, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CoachView } from '@/components/coach/coach-view';

export default function CoachPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const coachId = params.id as string;
  const coach = findCoach(coachId);

  if (!coach) {
    notFound();
  }

  const train = findTrain(coach.trainId);
  const initialSeatId = searchParams.get('seat') || undefined;
  const highlightSeatId = searchParams.get('highlight') || undefined;


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
                <h1 className="text-xl font-bold">Coach {coach.coachNumber}</h1>
                <p className="text-xs text-muted-foreground">{train?.trainNumber} {train?.name}</p>
            </div>
        </div>
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </div>
      
      <CoachView coach={coach} initialSeatId={initialSeatId} highlightSeatId={highlightSeatId} />
    </div>
  );
}
