
'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Train,
  CheckCircle,
  TrendingUp,
  Ban,
  AlertCircle,
  LogOut,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rail-assist-auth');
      localStorage.removeItem('rail-assist-role');
    }
    router.push('/');
  };

  const stats = [
    { title: 'Pax Checked', value: '450/450', Icon: FileText },
    { title: 'Excess Fare', value: '₹12,500', Icon: TrendingUp },
    { title: 'Empty Berths', value: '12', Icon: Ban },
    { title: 'Discrepancies', value: '0', Icon: AlertCircle },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">End Duty Summary</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <Train className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold">Train 12951</p>
              <p className="text-sm text-muted-foreground">
                Rajdhani Express
              </p>
            </div>
            <Badge variant="outline" className="ml-auto">
              Arriving at New Delhi (NDLS)
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
        <ShieldCheck className="h-4 w-4 text-green-400" />
        <AlertTitle className="font-bold">Data Synchronization Complete 100%</AlertTitle>
        <AlertDescription>
          All 450 passenger records and 12 transaction logs have been securely
          uploaded to the central server.
          <p className="text-xs mt-1">Last synced: Just now</p>
        </AlertDescription>
      </Alert>

      <div className="text-center space-y-4 mt-4">
        <p className="text-xs text-muted-foreground px-4">
          By ending duty, you confirm all inspections are complete for this leg
          of the journey.
        </p>
        <Button onClick={handleLogout} className="w-full text-base py-6">
          <LogOut className="mr-2 h-4 w-4" /> End Duty & Logout
        </Button>
        <Button variant="link" className="text-muted-foreground text-xs">
          Report Issue or Contact Control
        </Button>
      </div>
    </div>
  );
}
