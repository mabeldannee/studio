
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Train, User, UserCog, Wrench, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'home-hero-train');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background antialiased">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>

      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center justify-between px-4 text-center text-white lg:flex-row lg:text-left lg:px-8">
        {/* Left Side Content */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <Train className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold tracking-wider">RailAssist AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            The Future of Railway Operations is Here
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
            Leveraging AI to streamline ticket verification, enhance passenger services, and provide real-time operational intelligence. Save time, reduce disturbances, and create a seamless journey for everyone.
          </p>
        </div>

        {/* Right Side Login Cards */}
        <div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
          <div className="space-y-4">
            <Link href="/passenger-login" passHref>
              <div className="group flex items-center gap-6 rounded-xl border border-white/20 bg-white/5 p-5 backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-white/10 cursor-pointer">
                <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Passenger</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Confirm your presence and request assistance.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>

            <Link href="/login" passHref>
              <div className="group flex items-center gap-6 rounded-xl border border-white/20 bg-white/5 p-5 backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-white/10 cursor-pointer">
                <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
                  <UserCog className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ticket Examiner</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    Access the AI-powered operational dashboard.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>

            <Link href="/obhs-login" passHref>
              <div className="group flex items-center gap-6 rounded-xl border border-white/20 bg-white/5 p-5 backdrop-blur-lg transition-all duration-300 hover:border-primary hover:bg-white/10 cursor-pointer">
                <div className="rounded-full bg-primary/10 p-4 border border-primary/20">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Onboard Service</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    View and manage passenger service requests.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-6 w-6 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-4 z-20 text-center text-xs text-slate-400">
        Powered by Google Cloud
      </footer>
    </div>
  );
}
