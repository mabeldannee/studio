'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  Info,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const notifications = [
  {
    icon: UserPlus,
    iconColor: 'text-blue-500',
    title: 'Confirm Your Presence',
    description:
      'Please tap to confirm you have boarded the train. This helps us with occupancy updates.',
    time: '2m ago',
    isUnread: true,
  },
  {
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    title: 'Ticket Verified',
    description:
      'The TTE has verified your ticket electronically. Have a safe journey!',
    time: '15m ago',
    isUnread: true,
  },
  {
    icon: Info,
    iconColor: 'text-orange-500',
    title: 'Coach Status',
    description:
      'Coach B3 is currently reporting high occupancy (40% empty). You may move there for more space.',
    time: '1h ago',
    isUnread: true,
  },
  {
    icon: Clock,
    iconColor: 'text-blue-500',
    title: 'Schedule Update',
    description: 'Train 12951 is running on time. Next stop: Kota Jn (KOTA).',
    time: '2h ago',
    isUnread: false,
  },
  {
    icon: Info,
    iconColor: 'text-orange-500',
    title: 'Pantry Services',
    description: 'Dinner service will begin in approximately 30 minutes.',
    time: '3h ago',
    isUnread: false,
  },
];

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="min-h-screen bg-muted/40 flex justify-center">
      <div className="w-full max-w-md bg-background shadow-lg">
        <header className="p-4 bg-background sticky top-0 z-10 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/passenger/overview" passHref>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-lg">Notifications</h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread messages
                </p>
              </div>
            </div>
            <Button variant="link" className="text-primary pr-0">
              Mark all read
            </Button>
          </div>
        </header>

        <main className="p-4 space-y-3">
          {notifications.map((notification, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4 flex items-start gap-4 relative">
                <div className="flex-shrink-0">
                  <notification.icon
                    className={`h-6 w-6 ${notification.iconColor}`}
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
                {notification.isUnread && (
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary"></div>
                )}
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
}
