import Link from 'next/link';
import { Train, User, UserCog } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 antialiased">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="p-4 bg-primary/10 rounded-full mb-4 border-2 border-primary/20">
          <Train className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          RailAssist AI
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Operational Intelligence for Indian Railways
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto grid sm:grid-cols-2 gap-6">
        <Link href="/passenger-login" passHref>
          <div className="group relative p-6 bg-card rounded-xl border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-1">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Passenger</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Confirm your presence, track your journey, and receive real-time updates.
              </p>
            </div>
          </div>
        </Link>
        <Link href="/login" passHref>
          <div className="group relative p-6 bg-card rounded-xl border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-1">
             <div className="flex flex-col items-center justify-center h-full">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <UserCog className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Ticket Examiner</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Access the operational dashboard, manage coaches, and use AI-powered assistance.
              </p>
            </div>
          </div>
        </Link>
      </div>
       <footer className="absolute bottom-6 text-center text-xs text-muted-foreground">
        Powered by Google Cloud
      </footer>
    </div>
  );
}
