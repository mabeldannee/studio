import { trains } from '@/lib/data';
import { TrainCard } from '@/components/dashboard/train-card';
import { Button } from '@/components/ui/button';
import { VerificationFocus } from '@/components/dashboard/verification-focus';

export default function DashboardHomePage() {
  const train = trains[0]; // For demonstration, we'll use the first train

  return (
    <div className="flex flex-col gap-4">
       <div>
          <h1 className="text-2xl font-bold">{train.trainNumber}-{train.name}</h1>
          <p className="text-sm text-muted-foreground">Last Sync: 10:42 AM</p>
        </div>

      <div className="p-4 bg-card rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-muted-foreground">CURRENT LOCATION</p>
                    <p className="font-bold text-lg">New Delhi</p>
                    <p className="text-xs text-muted-foreground">NDLS</p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground">Distance</p>
                    <p className="font-bold text-lg">450 km</p>
                </div>
                <div className="text-right">
                    <p className="text-muted-foreground">Next: Kanpur Central</p>
                    <p className="font-bold text-lg">Arr. 16:20 (10m delay)</p>
                    <p className="text-xs text-muted-foreground">CNB</p>
                </div>
            </div>
        </div>

        <VerificationFocus trains={trains} />

        <div>
            <div className="flex items-center gap-2 mb-4">
                <Button variant="secondary" size="sm" className="rounded-full">All Coaches</Button>
                <Button variant="outline" size="sm" className="rounded-full">Attention (2)</Button>
                <Button variant="outline" size="sm" className="rounded-full">AC Class</Button>
            </div>
            <h2 className="text-lg font-semibold mb-3">Coach Overview <span className="text-muted-foreground">({train.coaches.length} Coaches)</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {train.coaches.map(coach => (
                    <TrainCard key={coach.id} coach={coach} />
                ))}
            </div>
        </div>
    </div>
  );
}
