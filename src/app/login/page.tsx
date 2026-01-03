
'use client';

import { Train, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
    const router = useRouter();

    const handleResume = () => {
        // Simulate successful login for resume action
        if (typeof window !== 'undefined') {
            localStorage.setItem('rail-assist-auth', 'true');
            localStorage.setItem('rail-assist-role', 'TTE');
        }
        router.push('/dashboard');
    };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0"></div>
        <div className="w-full max-w-md z-10">

            <header className="flex flex-col items-center text-center mb-8">
                <div className="p-3 bg-primary/10 rounded-lg mb-4 border border-primary/20">
                    <Train className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">RailAssist AI</h1>
                <p className="text-muted-foreground mt-2">Operational Intelligence for Indian Railways</p>
            </header>

            <main>
                <LoginForm />

                <div className="mt-8">
                    <h2 className="font-semibold mb-3 text-center text-lg">Or Resume Journey</h2>
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
                        <Button onClick={handleResume} variant="link" className="text-primary p-0 h-auto mt-4 font-bold">
                            RESUME CHECKING <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="text-center text-xs text-muted-foreground mt-8">
                <Link href="/obhs-login">
                    <Button variant="link" size="sm" className="text-muted-foreground">Login as Onboard Service Staff</Button>
                </Link>
            </footer>
        </div>
    </div>
  );
}
