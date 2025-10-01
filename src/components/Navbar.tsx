'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import { CircleQuestionMark, Compass, ImageIcon, LogOutIcon, Moon, Sun, UserRound } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

type Session = typeof authClient.$Infer.Session;

interface SessionProps {
  session: Session | null;
}
export default function Navbar({ session }: SessionProps) {
  const { theme, setTheme } = useTheme();
  const isAuthenticated = !!session?.user;
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="border-b border-border">
      <nav className="layout py-4 flex justify-between items-center">
        <div className="flex gap-1">
          <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
          <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/discover">
            <Button variant={'ghost'} className="font-medium rounded-full" size={'lg'}>
              <Compass />
              Discover
            </Button>
          </Link>
          <Button variant="ghost" className="rounded-full" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Moon /> : <Sun />}
          </Button>
          {!isAuthenticated ? (
            <Link href="/login">
              <Button className="bg-accent hover:bg-[#27945f] rounded-full font-medium text-white shadow-sm" size={'lg'}>
                Login
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer ring-0 focus:ring-0 border-0 focus:border-none">
                <Avatar>
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback>
                      {session.user.name
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      {session.user.image ? (
                        <AvatarImage src={session.user.image} />
                      ) : (
                        <AvatarFallback>
                          {session.user.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="">
                      <p className="text-bold"> {session.user.name}</p>
                      <p className="text-xs">{session.user.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer my-1">
                    <UserRound /> Profil
                  </DropdownMenuItem>
                </Link>
                <Link href="/home">
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer my-1">
                    <CircleQuestionMark /> Pertanyaan
                  </DropdownMenuItem>
                </Link>
                <Link href="/">
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                    <ImageIcon /> Pengaturan OG
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem className="flex items-center gap-3 cursor-pointer my-1 group hover:!text-red-500 transition-colors duration-200" onClick={handleLogout}>
                  <LogOutIcon className="group-hover:!text-red-500 text-muted-foreground transition-colors duration-200" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
}
