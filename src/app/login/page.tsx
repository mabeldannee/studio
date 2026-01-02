import { Train } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3 bg-primary rounded-full mb-4">
                <Train className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary font-headline tracking-tight">
                RailAssist AI
            </h1>
            <p className="text-muted-foreground mt-1">
                Operational Intelligence for Indian Railways
            </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
