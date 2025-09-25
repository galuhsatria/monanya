'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { authClient, useSession } from '@/lib/auth-client';
import { Compass, ImageIcon, LogOutIcon, Moon, Sun, UserRound } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { data: session, isPending } = useSession();
  const isAuthenticated = !!session?.user && !isPending;
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

  return (
    <header className="border-b border-border">
      <nav className="layout py-4 flex justify-between items-center">
        <div className="flex gap-1">
          <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
          <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* <Link href={'/'} target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </Link> */}
          <Link href="/discover">
            <Button variant={'ghost'} className="font-medium rounded-full" size={'lg'}>
              <Compass />
              Discover
            </Button>
          </Link>
          <Button variant="ghost" className='rounded-full' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Moon /> : <Sun />}
          </Button>
          {mounted ? (
            !isAuthenticated ? (
              <div>
                {' '}
                <Link href="/login">
                  <Button className="bg-accent hover:bg-[#27945f] rounded-full font-bold text-white shadow-sm" size={'lg'}>
                    Login
                  </Button>
                </Link>
              </div>
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
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer my-1">
                    <UserRound /> Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                    <ImageIcon /> Pengaturan
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 cursor-pointer my-1 group hover:!text-red-500 transition-colors duration-200" onClick={handleLogout}>
                    <LogOutIcon className="group-hover:!text-red-500 text-muted-foreground transition-colors duration-200" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          ) : null}
        </div>
      </nav>
    </header>
  );
}
