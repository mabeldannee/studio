"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot, Loader2, LogIn, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  explainSuspiciousActivity,
  type ExplainSuspiciousActivityOutput,
} from "@/ai/flows/explain-suspicious-activity";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  tteId: z.string().min(1, "TTE ID is required."),
  password: z.string().min(1, "Password is required."),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] =
    useState<ExplainSuspiciousActivityOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tteId: "TTE123",
      password: "password",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsAiLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate login metadata for AI analysis
    const loginMetadata = {
      time: new Date().toLocaleTimeString(),
      device: Math.random() > 0.5 ? "Unknown Device" : "Registered Mobile",
      frequency: Math.random() > 0.5 ? "High" : "Normal",
    };

    try {
      const explanation = await explainSuspiciousActivity(loginMetadata);
      setAiExplanation(explanation);
    } catch (error) {
      console.error("AI explanation failed:", error);
      setAiExplanation({
        explanation: "Could not analyze login activity.",
      });
    } finally {
      setIsAiLoading(false);
    }

    // Simulate successful login
    if (typeof window !== "undefined") {
      localStorage.setItem("rail-assist-auth", "true");
    }

    // Wait for user to see the AI message, then redirect
    setTimeout(() => {
      router.push("/dashboard");
    }, aiExplanation ? 4000 : 1000);
  }

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">TTE Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="tteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TTE ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., TTE123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isAiLoading && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing login activity...
              </div>
            )}
            {aiExplanation && !isAiLoading && (
              <Alert>
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle className="font-bold flex items-center gap-2">
                  <Bot className="h-4 w-4" /> AI Security Intel
                </AlertTitle>
                <AlertDescription>{aiExplanation.explanation}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
