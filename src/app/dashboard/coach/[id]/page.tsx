
'use client';
import { notFound, useRouter } from 'next/navigation';
import { findCoach, findTrain } from '@/lib/data';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { CoachView } from '@/components/coach/coach-view';
import { ArrowLeft, MoreVertical, Search, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CoachPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CoachPage({ params, searchParams }: CoachPageProps) {
  const router = useRouter();
  const coach = findCoach(params.id);

  if (!coach) {
    notFound();
  }

  const train = findTrain(coach.trainId);
  const initialSeatId = searchParams.seat as string | undefined;

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
             <div className="flex items-center gap-1 text-xs font-medium text-green-400 mr-2">
                <Wifi className="h-4 w-4" />
                Synced
            </div>
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
            </Button>
        </div>
      </div>
      
      <CoachView coach={coach} initialSeatId={initialSeatId} />
    </div>
  );
}
