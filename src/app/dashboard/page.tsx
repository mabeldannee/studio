
'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function DashboardRootPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('rail-assist-role') || 'TTE';
      if (role === 'OBHS') {
        redirect('/dashboard/obhs');
      } else {
        redirect('/dashboard/home');
      }
    }
  }, []);

  return null; // Or a loading indicator
}
