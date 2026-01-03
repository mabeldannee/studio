
'use client';

import {
  ArrowLeft,
  Wifi,
  X,
  Check,
  Star,
  Ban,
  TrendingUp,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const highConfidenceMatches = [
  {
    vacantSeat: 'S5 - 12',
    berth: 'UPPER',
    reason: 'NO SHOW (2 Stations Passed)',
    reasonIcon: Ban,
    reasonColor: 'text-red-400',
    candidateName: 'R. Sharma (M, 34)',
    pnr: '829-441-9921',
    status: 'RAC 3',
    statusVariant: 'secondary',
  },
  {
    vacantSeat: 'B2 - 31',
    berth: 'SIDE LOWER',
    reason: 'Last Minute Cancellation',
    reasonIcon: TrendingUp,
    reasonColor: 'text-orange-400',
    candidateName: 'Anjali Singh (F, 28)',
    pnr: '221-009-1123',
    status: 'WL 1',
    statusVariant: 'destructive',
  },
];

export default function ReallocationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Reallocation Advisory</h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-green-400">
          <Wifi className="h-4 w-4" />
          LIVE
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-border rounded-lg border bg-card">
        <div className="p-3 text-center">
          <p className="text-xs text-muted-foreground">TRAIN</p>
          <p className="font-bold">12951</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-muted-foreground">NEXT</p>
          <p className="font-bold">Kota Jn</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-xs text-muted-foreground">VACANT</p>
          <p className="font-bold">14 Seats</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Button size="sm" className="rounded-full">
          All Alerts (5)
        </Button>
        <Button size="sm" variant="outline" className="rounded-full">
          Sleeper (3)
        </Button>
        <Button size="sm" variant="outline" className="rounded-full">
          AC 3 Tier (2)
        </Button>
      </div>

      {/* Matches */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Star className="h-4 w-4" /> HIGH CONFIDENCE MATCHES
        </h2>

        {highConfidenceMatches.map((match, index) => (
          <div key={index} className="rounded-lg border bg-card p-4 space-y-4">
            {/* Vacant Seat Info */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{match.vacantSeat}</span>
                  <Badge variant="outline">{match.berth}</Badge>
                </div>
                <div
                  className={`flex items-center gap-1.5 text-xs font-semibold ${match.reasonColor}`}
                >
                  <match.reasonIcon className="h-3.5 w-3.5" />
                  {match.reason}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Chart Vacancy</p>
                <span className="relative flex h-2 w-2 mt-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
            </div>

            {/* Suggested Candidate */}
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-semibold text-blue-400 mb-1">
                SUGGESTED CANDIDATE
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{match.candidateName}</p>
                  <p className="text-xs text-muted-foreground">
                    PNR: {match.pnr}
                  </p>
                </div>
                <Badge variant={match.statusVariant as any}>{match.status}</Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="icon" className="col-span-1">
                <X className="h-4 w-4" />
              </Button>
              <Button className="col-span-2">
                <Check className="mr-2 h-4 w-4" />
                Confirm Reallocation
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Footer */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-yellow-500/10 p-3 text-xs text-yellow-500 border border-yellow-500/20">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          Advisory only. Manual confirmation required. System suggestions based
          on chart data. Verify physical occupancy.
        </p>
      </div>
    </div>
  );
}
