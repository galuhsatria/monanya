'use client';

import Image from 'next/image';
import React from 'react';
import { Badge } from './ui/badge';
import { useTheme } from 'next-themes';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { usePathname } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function UserNav() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const url = process.env.NEXT_PUBLIC_BASE_URL + pathname;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link berhasil disalin!');
  };

  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex gap-1 items-center">
        <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
        <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Share2 className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-2 p-3 w-max" align="end">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title="Tanya apa saja secara anonim di Monanya">
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title="Monanya - Tanya Anonim">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <button onClick={handleCopy} className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-400 cursor-pointer text-white">
            <Copy className="w-4 h-4" />
          </button>
        </PopoverContent>
      </Popover>
    </header>
  );
}
