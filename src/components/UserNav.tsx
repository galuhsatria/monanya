'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Share from './Share';
import { Badge } from './ui/badge';

export default function UserNav({ username }: { username: string }) {
  const { theme } = useTheme();
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex gap-1 items-center">
        <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
        <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
      </div>

      <Share username={username} />
    </header>
  );
}
