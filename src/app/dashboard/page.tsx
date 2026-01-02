import { trains } from '@/lib/data';
import type { Alert as AlertType } from '@/lib/types';
import { TrainCard } from '@/components/dashboard/train-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Siren, ArrowRight, Bot } from 'lucide-react';
import Link from 'next/link';
import { VerificationFocus } from '@/components/dashboard/verification-focus';

export default function DashboardPage() {
  const allAlerts: AlertType[] = trains.flatMap(train =>
    train.alerts.map(alert => ({ ...alert, trainNumber: train.trainNumber }))
  );

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold">Welcome, TTE!</CardTitle>
            <CardDescription>
              Here is your real-time operational overview.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <span>Presence Intelligence is active.</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Trains</CardDescription>
            <CardTitle className="text-4xl">{trains.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across your assigned routes.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High-Urgency Alerts</CardDescription>
            <CardTitle className="text-4xl text-destructive">
              {allAlerts.filter(a => a.urgency === 'high').length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Immediate attention required.
            </div>
          </CardContent>
        </Card>
      </div>

      <VerificationFocus trains={trains} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="text-xl font-bold tracking-tight mb-4">Active Trains</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {trains.map(train => (
              <TrainCard key={train.id} train={train} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Siren className="text-destructive" />
                  Real-time Alerts
                </CardTitle>
                <CardDescription>
                  Prioritized list of exceptions requiring your attention.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {allAlerts.slice(0, 4).map(alert => (
                  <Alert key={alert.id} variant={alert.urgency === 'high' ? 'destructive' : 'default'}>
                    <Siren className="h-4 w-4" />
                    <AlertTitle className="font-bold">{alert.type}</AlertTitle>
                    <AlertDescription>
                      <div className="flex justify-between items-center">
                        <span>Train {alert.trainNumber}, Seat {alert.seatId?.split('-')[1] || 'N/A'}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/coach/${alert.coachId}?seat=${alert.seatId}`}>
                             View <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
                {allAlerts.length === 0 && <p className="text-sm text-muted-foreground">No active alerts.</p>}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
