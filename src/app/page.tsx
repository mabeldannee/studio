
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Train, User, UserCog, Wrench, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'home-hero-train');

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background antialiased p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      {/* Aurora Effect */}
      <div
        className={cn(
          "absolute -bottom-40 -left-40 z-10",
          "h-[400px] w-[400px] rounded-full",
          "bg-primary/30 blur-[100px]",
          "animate-aurora-1"
        )}
      />
      <div
        className={cn(
          "absolute -top-60 -right-20 z-10",
          "h-[500px] w-[500px] rounded-full",
          "bg-fuchsia-500/20 blur-[120px]",
          "animate-aurora-2"
        )}
      />
      
      <div className="relative z-20 flex w-full max-w-xl flex-col items-center text-center text-white animate-fade-in-up">
        
        {/* Header Content */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
                <Train className="h-12 w-12 text-primary" />
                <div className="absolute -top-2 -right-2 h-4 w-4 bg-primary rounded-full animate-ping"></div>
            </div>
            <span className="text-4xl font-semibold tracking-wider">RailAssist AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2">
            The Future of Railway Operations
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Leveraging AI to streamline ticket verification, enhance passenger services, and provide real-time operational intelligence. Save time, reduce disturbances, and increase efficiency.
          </p>
        </div>

        {/* Login Cards */}
        <div className="w-full max-w-lg space-y-4">
            <LoginCard 
              href="/passenger-login"
              icon={User}
              title="Passenger"
              description="Confirm presence and request assistance."
            />
            <LoginCard 
              href="/login"
              icon={UserCog}
              title="Ticket Examiner"
              description="Access the AI-powered operational dashboard."
            />
            <LoginCard 
              href="/obhs-login"
              icon={Wrench}
              title="Onboard Service"
              description="Manage passenger service requests."
            />
        </div>
      </div>

      <footer className="absolute bottom-6 z-20 text-center text-xs text-slate-400/50">
        Powered by Google Cloud
      </footer>
    </div>
  );
}


function LoginCard({ href, icon: Icon, title, description }: { href: string; icon: React.ElementType; title: string; description: string; }) {
  return (
    <Link href={href} passHref>
      <div className={cn(
        "group relative flex items-center gap-6 rounded-xl border p-5",
        "border-white/10 bg-white/5 backdrop-blur-xl",
        "transition-all duration-300",
        "hover:border-primary/50 hover:bg-white/10 hover:scale-[1.02]"
      )}>
        {/* Shine effect */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
            <div className="absolute -top-20 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>

        <div className={cn(
            "relative z-10 rounded-lg p-4",
            "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20",
            "transition-colors duration-300 group-hover:border-primary/40"
        )}>
          <Icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="relative z-10 text-left">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-slate-300 mt-1">
            {description}
          </p>
        </div>
        <ArrowRight className="relative z-10 ml-auto h-6 w-6 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}

