import Link from 'next/link';
import { Train, User, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="p-3 bg-primary rounded-full mb-4 text-primary-foreground">
          <Train className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold text-primary tracking-tight">
          RailAssist AI
        </h1>
        <p className="text-muted-foreground mt-1">
          Operational Intelligence for Indian Railways
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <Card className="p-4 sm:p-6">
          <CardHeader className="text-center">
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>Please select your role to continue.</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <Link href="/passenger-login" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg border-2 border-transparent hover:border-primary hover:bg-accent transition-all cursor-pointer h-full">
                <User className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold">I am a Passenger</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Confirm presence & track your journey.
                </p>
              </div>
            </Link>
            <Link href="/login" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg border-2 border-transparent hover:border-primary hover:bg-accent transition-all cursor-pointer h-full">
                <UserCog className="h-10 w-10 text-primary mb-3" />
                <h3 className="text-lg font-semibold">I am a TTE</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Access the operational dashboard.
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
