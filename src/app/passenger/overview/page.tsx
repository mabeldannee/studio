
import { ArrowLeft, Calendar, Info, Train } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function JourneyOverviewPage() {
  const trainImage = PlaceHolderImages.find(img => img.id === 'train-rajdhani');

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-card shadow-lg">
        <header className="p-4 flex items-center gap-4 border-b">
          <Link href="/passenger-login">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Journey Overview</h1>
        </header>
        <main className="p-4 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {trainImage && (
                  <Image
                    src={trainImage.imageUrl}
                    alt="Rajdhani Express"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={trainImage.imageHint}
                  />
                )}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white w-fit mb-2">CONFIRMED</Badge>
                    <div className="flex items-center gap-2 text-white">
                        <Train className="h-4 w-4"/>
                        <span className="text-xs font-medium">INDIAN RAILWAYS</span>
                    </div>
                    <h2 className="text-white text-2xl font-bold">12951-Rajdhani Express</h2>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center text-center">
                    <div className="w-1/3">
                        <p className="text-2xl font-bold">NDLS</p>
                        <p className="text-sm text-muted-foreground">New Delhi</p>
                        <p className="text-xs text-muted-foreground">16:30, Wed</p>
                    </div>
                    <div className="w-1/3 text-center">
                        <div className="relative">
                             <p className="text-xs text-muted-foreground">15h 35m</p>
                             <div className="flex items-center">
                                <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                                <div className="flex-grow border-t-2 border-dotted border-gray-400 mx-1"></div>
                                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                <div className="flex-grow border-t-2 border-dotted border-gray-400 mx-1"></div>
                                <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                             </div>
                        </div>
                    </div>
                    <div className="w-1/3 text-right">
                        <p className="text-2xl font-bold">MMCT</p>
                        <p className="text-sm text-muted-foreground">Mumbai Central</p>
                        <p className="text-xs text-muted-foreground">08:05, Thu</p>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600"/>
                    <div>
                        <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold">JOURNEY DATE</p>
                        <p className="font-bold text-blue-900 dark:text-blue-100">Wednesday, 25 Oct 2023</p>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-1/2 text-center p-4">
                        <p className="text-sm text-muted-foreground">COACH</p>
                        <p className="text-3xl font-bold">A1</p>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-1/2 text-center p-4">
                         <p className="text-sm text-muted-foreground">SEAT</p>
                        <div className="flex items-center justify-center gap-2">
                             <p className="text-3xl font-bold">45</p>
                             <Badge variant="outline">Win</Badge>
                        </div>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Alert variant="default" className="bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800">
            <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertDescription className="text-orange-800 dark:text-orange-300 text-xs">
                Meal preference confirmed: Veg Standard. <Link href="#" className="font-bold hover:underline">Tap to manage preferences.</Link>
            </AlertDescription>
          </Alert>

          <p className="text-center text-xs text-muted-foreground px-4">
            This app facilitates updates but does not replace physical ticket checking. Please keep your original ID proof handy.
          </p>

          <Link href="/dashboard" passHref>
             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-6">
                Proceed to Dashboard &rarr;
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}
