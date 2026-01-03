
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Info, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  mobile: z.string().min(10, "Mobile number must be 10 digits.").max(10, "Mobile number must be 10 digits."),
  pnr: z.string().optional(),
});

interface PassengerLoginFormProps {
  onLoginSuccess: () => void;
}

export function PassengerLoginForm({ onLoginSuccess }: PassengerLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mobile");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      pnr: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLoginSuccess();
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-lg p-1">
          <TabsTrigger value="mobile" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">Mobile Number</TabsTrigger>
          <TabsTrigger value="pnr" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">PNR Number</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <TabsContent value="mobile" className="m-0">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">+91</span>
                        <Input className="pl-10" placeholder="00000 00000" {...field} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="pnr" className="m-0">
                <FormField
                    control={form.control}
                    name="pnr"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>PNR Number</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your 10-digit PNR" {...field} />
                        </FormControl>
                    </FormItem>
                    )}
                />
            </TabsContent>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Get OTP
            </Button>
          </form>
        </Form>
      </Tabs>
      
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary/80 text-xs">
            <strong>Important:</strong> This app does not replace ticket verification by the TTE. Please carry your original valid ID proof and ticket during the journey.
        </AlertDescription>
      </Alert>
    </div>
  );
}
