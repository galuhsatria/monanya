import Navbar from '@/components/Navbar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <section>
      <Navbar session={session} />
      {children}
    </section>
  );
}
