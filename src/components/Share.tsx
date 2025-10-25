'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Copy, Share2 } from 'lucide-react';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { toast } from 'sonner';
import { Button } from './ui/button';

type ShareProps = {
  username: string;
  align?: 'start' | 'center' | 'end';
};

export default function Share({ username, align = 'end' }: ShareProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${username ?? ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link berhasil disalin!');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} size={'sm'} className="rounded-full !h-9">
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2 p-3 w-max" align={align}>
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
  );
}