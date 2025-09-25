import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="layout">
      <div className="text-center flex items-center flex-col mt-10 gap-5">
        <Link href="/login" className="text-xs bg-green-500/10 text-accent rounded-full px-3 py-1.5 flex items-center gap-1">
          Coba Sekarang <Rocket size={16} />
        </Link>
        <h1 className="text-5xl font-extrabold leading-14 text-center max-w-xl">
          Dapatkan pertanyaan dari orang secara <span className="text-accent">anonim</span>
        </h1>
        <div className='flex gap-3'>
          <Button className='min-w-28 bg-accent rounded-full' size={'lg'}>Get Started</Button>
          <Button className='min-w-28 rounded-full' size={'lg'} variant={'secondary'}>Explor</Button>
        </div>
      </div>
    </main>
  );
}
