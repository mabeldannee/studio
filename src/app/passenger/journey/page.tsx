'use client';

import {
  ArrowLeft,
  Users,
  Train,
  Clock,
  Wifi,
  Info,
  Utensils,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex justify-center">
      <div className="w-full max-w-md bg-background shadow-lg">
        <header className="p-4 bg-primary text-primary-foreground">
          <div className="flex items-center gap-2 mb-4">
            <Train className="h-5 w-5" />
            <p className="font-semibold">Next Station</p>
          </div>
          <h1 className="text-3xl font-bold">Vadodara Jn</h1>
          <p className="opacity-80">Station Code: BRC</p>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <p className="text-xs opacity-80">Arrival</p>
              <p className="font-semibold">15:08</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Platform</p>
              <p className="font-semibold">4</p>
            </div>
            <div>
              <p className="text-xs opacity-80">ETA</p>
              <p className="font-semibold">20 mins</p>
            </div>
          </div>
        </header>

        <main className="p-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Crowd Suggestion</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Coach S6 is currently less crowded (40% empty). You may move
                    there for more space.
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-2 text-orange-500 border-orange-200"
                  >
                    Suggestion Only - No Action Required
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Upcoming Stations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <div className="w-px h-12 bg-border"></div>
                </div>
                <div>
                  <p className="font-bold">Vadodara Jn</p>
                  <p className="text-xs text-muted-foreground">
                    Platform 4  45 km
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                  <div className="w-px h-12 bg-border"></div>
                </div>
                <div>
                  <p className="font-semibold">Ratlam Jn</p>
                  <p className="text-xs text-muted-foreground">
                    Platform 2  280 km
                  </p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-border"></div>
                   <div className="w-px h-12 bg-border"></div>
                </div>
                <div>
                  <p className="font-semibold">Kota Jn</p>
                  <p className="text-xs text-muted-foreground">
                    Platform 1  520 km
                  </p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-border mt-1"></div>
                <div>
                  <p className="font-semibold">New Delhi</p>
                  <p className="text-xs text-muted-foreground">
                    Platform 16  1385 km
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" /> Pantry Services
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>
                <Badge variant="secondary">Available</Badge>
              </p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <p>Dinner begins in 20 minutes</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p>Vegetarian options available</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Service Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <div>
                  <p className='font-semibold text-foreground'>Train is running on time</p>
                  <p className='text-xs'>Last updated 5 mins ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-500" />
                 <div>
                  <p className='font-semibold text-foreground'>WiFi available in your coach</p>
                  <p className='text-xs'>Network: RailWire</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-xs">
              All information provided is for guidance only. Platform numbers
              and timings are subject to change. Please verify with railway
              staff for critical decisions.
            </p>
          </div>
        </main