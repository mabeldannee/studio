
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Train, HelpCircle } from 'lucide-react';
import { PassengerLoginForm } from '@/components/auth/passenger-login-form';
import Link from 'next/link';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function PassengerLoginPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const trainImage = PlaceHolderImages.find(img => img.id === 'train-rajdhani');


    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        router.push('/passenger/overview');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
             {trainImage && (
                <Image
                    src={trainImage.imageUrl}
                    alt={trainImage.description}
                    data-ai-hint={trainImage.imageHint}
                    fill
                    className="object-cover z-0"
                />
            )}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="w-full max-w-md z-20">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-2xl shadow-primary/10 p-6 sm:p-8 relative border border-border/50">
                    <Link href="#" className="absolute top-4 right-4 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Help
                    </Link>
                    <div className="flex flex-col items-start mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg mb-4 border border-primary/20">
                            <Train className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">
                            Welcome Aboard
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Log in to confirm your presence and track your journey.
                        </p>
                    </div>
                    <PassengerLoginForm onLoginSuccess={handleLoginSuccess} />
                </div>
            </div>
        </div>
    );
}
