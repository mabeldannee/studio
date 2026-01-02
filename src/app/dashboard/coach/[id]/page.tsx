import { notFound } from 'next/navigation';
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

type CoachPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CoachPage({ params, searchParams }: CoachPageProps) {
  const coach = findCoach(params.id);

  if (!coach) {
    notFound();
  }

  const train = findTrain(coach.trainId);
  const initialSeatId = searchParams.seat as string | undefined;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link href="#">Train {train?.trainNumber}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Coach {coach.coachNumber}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl font-bold tracking-tight">
        Coach {coach.coachNumber} <span className="text-muted-foreground font-normal">({train?.name})</span>
      </h1>

      <CoachView coach={coach} initialSeatId={initialSeatId} />
    </div>
  );
}
