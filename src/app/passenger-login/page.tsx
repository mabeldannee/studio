
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
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center text-gray-500 text-sm mb-2">Login / Entry Screen</div>
                <div className="bg-white dark:bg-card rounded-xl shadow-lg p-6 sm:p-8 relative">
                    <Link href="#" className="absolute top-4 right-4 flex items-center text-sm text-blue-600 hover:underline">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Help
                    </Link>
                    <div className="flex flex-col items-start mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4">
                            <Train className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
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
