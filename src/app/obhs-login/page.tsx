
"use client";

import { useRouter } from 'next/navigation';
import { Train, Wrench, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ObhsLoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        // Simulate successful login
        if (typeof window !== 'undefined') {
            localStorage.setItem('rail-assist-auth', 'true');
            localStorage.setItem('rail-assist-role', 'OBHS');
        }
        router.push('/dashboard/obhs');
    };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <header className="flex flex-col items-center text-center mb-8">
            <div className="p-3 bg-primary/10 rounded-lg mb-4 border border-primary/20">
                <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Onboard Service Staff</h1>
            <p className="text-muted-foreground mt-2">Login to manage service requests.</p>
        </header>

        <main>
          <Card className="bg-card border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>OBHS Login</CardTitle>
              <CardDescription>Enter your service ID and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="service-id" className="text-sm font-medium">Service ID</label>
                <Input id="service-id" placeholder="e.g., OBHS-451" className="bg-input border-border" />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                 <Input id="password" type="password" placeholder="••••••••" className="bg-input border-border" />
              </div>
              
              <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-base">
                  Access Service Dashboard
              </Button>
            </CardContent>
          </Card>

          <Alert variant="default" className="mt-6 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">Role-Specific Access</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400 text-xs">
                This login is for onboard service staff to view and acknowledge service requests. It does not provide access to passenger identity, ticket information, or seat verification.
            </AlertDescription>
          </Alert>

           <div className="text-center mt-8">
              <Link href="/" passHref>
                  <Button variant="link" className="text-muted-foreground">Return to main screen</Button>
              </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
