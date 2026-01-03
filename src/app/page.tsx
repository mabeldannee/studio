
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Train, User, UserCog, Wrench, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'home-hero-train');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background antialiased p-4">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover z-0"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/80 to-black/90 z-10"></div>

      <div className="relative z-20 flex w-full max-w-lg flex-col items-center text-center text-white">
        
        {/* Header Content */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Train className="h-10 w-10 text-primary" />
            <span className="text-3xl font-semibold tracking-wider">RailAssist AI</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            The Future of Railway Operations
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto">
            Leveraging AI to streamline ticket verification, enhance passenger services, and provide real-time operational intelligence.
          </p>
        </div>

        {/* Login Cards */}
        <div className="w-full space-y-4">
            <Link href="/passenger-login" passHref>
              <div className="group flex items-center gap-6 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-white/20 hover:scale-105 cursor-pointer">
                <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-left">Passenger</h3>
                  <p className="text-sm text-slate-300 mt-1 text-left">
                    Confirm presence and request assistance.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>

            <Link href="/login" passHref>
              <div className="group flex items-center gap-6 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-white/20 hover:scale-105 cursor-pointer">
                <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                  <UserCog className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-left">Ticket Examiner</h3>
                  <p className="text-sm text-slate-300 mt-1 text-left">
                    Access the AI-powered operational dashboard.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>

            <Link href="/obhs-login" passHref>
              <div className="group flex items-center gap-6 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-white/20 hover:scale-105 cursor-pointer">
                <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-left">Onboard Service</h3>
                  <p className="text-sm text-slate-300 mt-1 text-left">
                    Manage passenger service requests.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          </div>
      </div>

      <footer className="absolute bottom-6 z-20 text-center text-xs text-slate-400">
        Powered by Google Cloud
      </footer>
    </div>
  );
}
