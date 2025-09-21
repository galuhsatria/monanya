'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CircleAlert, Menu, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex gap-1">
          <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
          <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
        </div>
        {/* <ul className="menu flex items-center gap-8 max-md:hidden">
          {menu.map((menu, index) => (
            <li key={index}>
              <Link href={menu.link} className={`flex group items-center gap-2 text-md font-bold  hover:text-accent transition-colors duration-200 ${pathname === menu.link && 'text-accent'}`}>
                <div className={`${pathname === menu.link && 'text-accent'} text-muted-foreground group-hover:text-accent `}>{menu.icon}</div>
                {menu.label}
              </Link>
            </li>
          ))}
        </ul> */}
        <div className="flex items-center gap-4">
          <Link href={'/'} target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </Link>
          <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Moon /> : <Sun />}
          </Button>
          <Link href="/login">
            <Button className="bg-accent hover:bg-[#27945f] rounded-full font-bold text-white shadow-sm" size={'lg'}>
              Login
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden --focus">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:hidden me-4 mt-5" align="start">
              {menu.map((menu, index) => (
                <DropdownMenuItem key={index} className="my-2 ">
                  <Link href={menu.link} className={`flex items-center gap-2 text-md font-bold text-[#2B2B2B] dark:text-white hover:text-accent transition-colors duration-200 ${pathname === menu.link && 'text-accent'}`}>
                    {menu.icon}
                    {menu.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

const menu = [
  {
    label: 'Beranda',
    link: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
      </svg>
    ),
  },
  {
    label: 'Telusuri Pengguna',
    link: '/telusuri',
    icon: <Search size={16} />,
  },
  {
    label: 'Tentang',
    link: '/tentang',
    icon: <CircleAlert size={16} />,
  },
];
