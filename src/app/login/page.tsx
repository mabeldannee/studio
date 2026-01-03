import { Train, Wifi, User, Calendar, MapPin, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30 p-4 md:items-center md:justify-center">
      <div className="w-full max-w-md">
        <header className="flex justify-between items-center mb-6 md:hidden">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <div className="mb-8 text-center md:text-left">
             <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <Train className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">RailAssist AI</h1>
            </div>
            <p className="text-muted-foreground">Enter details to download or access the passenger chart.</p>
          </div>

          <Card className="bg-card border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Journey Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="train-number" className="text-sm font-medium">Train Number / Name</label>
                <div className="relative">
                  <Input id="train-number" placeholder="e.g. 12951" className="bg-input border-border" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="journey-date" className="text-sm font-medium">Journey Date</label>
                <div className="relative">
                  <Input id="journey-date" type="text" placeholder="10/24/2023" className="bg-input border-border" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="boarding-station" className="text-sm font-medium">Boarding Station</label>
                <Select>
                  <SelectTrigger id="boarding-station" className="bg-input border-border">
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ndls">New Delhi (NDLS)</SelectItem>
                    <SelectItem value="bct">Mumbai Central (BCT)</SelectItem>
                    <SelectItem value="hwh">Howrah (HWH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Link href="/dashboard" passHref>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-base">
                  Load Journey Data
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="font-semibold mb-3 text-center md:text-left">Recent Offline Access</h2>
            <Card className="bg-card/80 border-orange-500/50 border-2">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">12951</p>
                      <span className="text-xs font-semibold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">OFFLINE</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rajdhani Express</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="text-sm font-semibold">08:30 AM</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="font-bold text-xl">BCT</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-bold text-xl">NDLS</p>
                  </div>
                </div>
                 <Link href="/dashboard" passHref>
                    <Button variant="link" className="text-primary p-0 h-auto mt-4 font-bold">
                        RESUME CHECKING <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="text-center text-xs text-muted-foreground mt-8">
          Logged in as TTE Rajesh Kumar (ID: 0842)
        </footer>
      </div>
    </div>
  );
}
