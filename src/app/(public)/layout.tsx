import Navbar from '@/components/Navbar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
