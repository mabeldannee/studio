
import { trains } from '@/lib/data';
import { TrainCard } from '@/components/dashboard/train-card';
import { Button } from '@/components/ui/button';
import { VerificationFocus } from '@/components/dashboard/verification-focus';
import { ArrowRight, Wifi } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DashboardHomePage() {
  const train = trains[0]; // For demonstration, we'll use the first train

  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{train.trainNumber}-{train.name}</h1>
            <p className="text-sm text-muted-foreground">Last Sync: 10:42 AM</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-green-400">
            <Wifi className="h-4 w-4" />
            LIVE
          </div>
        </div>

      <div className="p-4 bg-card rounded-lg border border-border/50">
            <div className="flex justify-between items-center text-center">
                <div className='text-left'>
                    <p className="font-bold text-lg">New Delhi</p>
                    <p className="text-xs text-muted-foreground">NDLS</p>
                </div>
                <div className="flex-grow flex flex-col items-center px-4">
                    <div className="flex items-center w-full">
                      <div className="h-2 w-2 rounded-full bg-primary ring-2 ring-primary/50"></div>
                      <Progress value={50} className="h-1 flex-grow mx-2 bg-border" />
                      <div className="h-2 w-2 rounded-full bg-border"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Distance: 450 km</p>
                </div>
                <div className='text-right'>
                    <p className="text-muted-foreground text-sm">Next: Kanpur Central</p>
                    <p className="font-bold text-lg">Arr. 16:20 (On Time)</p>
                    <p className="text-xs text-muted-foreground">CNB</p>
                </div>
            </div>
      </div>

        <VerificationFocus trains={trains} />

        <div>
            <div className="flex items-center gap-2 mb-4">
                <Button variant="secondary" size="sm" className="rounded-md">All Coaches</Button>
                <Button variant="outline" size="sm" className="rounded-md">Attention (2)</Button>
                <Button variant="outline" size="sm" className="rounded-md">AC Class</Button>
            </div>
            <h2 className="text-lg font-semibold mb-3">Coach Overview <span className="text-muted-foreground">({train.coaches.length} Coaches)</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {train.coaches.map(coach => (
                    <TrainCard key={coach.id} coach={coach} />
                ))}
            </div>
        </div>
    </div>
  );
}
