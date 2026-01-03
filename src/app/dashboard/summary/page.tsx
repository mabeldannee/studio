
'use client';

import {
  ArrowLeft,
  Book,
  AlertTriangle,
  Send,
  CheckCircle,
  Clock,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function SummaryPage() {
  const router = useRouter();
  const train = {
    trainNumber: '12951',
    name: 'Rajdhani Exp',
    route: 'New Delhi → Mumbai Central',
    date: 'Oct 24, 2023 - 16:30 hrs',
    isCompleted: true,
  };

  const stats = [
    {
      title: 'Total Seats Checked',
      value: '452',
      Icon: Users,
    },
    {
      title: 'Verified Rate',
      value: '94%',
      Icon: CheckCircle,
    },
    {
      title: 'Vacant Seats',
      value: '18',
      Icon: User,
    },
    {
      title: 'Est. Time Saved',
      value: '45m',
      Icon: Clock,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Journey Summary</h1>
          </div>
        </div>
      </div>

      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">
                {train.trainNumber} {train.name}
              </h2>
              <p className="text-sm text-muted-foreground">{train.route}</p>
              <p className="text-xs text-muted-foreground mt-2">{train.date}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Book className="h-3 w-3" /> Data Saved Locally
              </p>
            </div>
            {train.isCompleted && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                COMPLETED
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <stat.Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          Verification Progress
        </h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm">425 Verified - 27 Unverified</p>
              <p className="text-sm font-bold text-primary">94%</p>
            </div>
            <Progress value={94} className="h-2" />
            <div className="flex items-center gap-4 text-xs mt-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                Verified (425)
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50"></div>
                Pending (27)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          QUICK ACTIONS
        </h3>
        <div className="space-y-3">
          <Card className="bg-card hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <p className="font-semibold">View Detailed Log</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card hover:bg-muted/50 cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="font-semibold">Flagged Incidents (2)</p>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full text-base py-6">
            <Send className="mr-2 h-4 w-4" />
            Submit Supervisor Report
          </Button>
        </div>
      </div>
    </div>
  );
}
