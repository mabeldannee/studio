
"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Train, HelpCircle } from 'lucide-react';
import { PassengerLoginForm } from '@/components/auth/passenger-login-form';
import Link from 'next/link';

export default function PassengerLoginPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        router.push('/passenger/overview');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-xl shadow-2xl shadow-primary/10 p-6 sm:p-8 relative border border-border">
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
