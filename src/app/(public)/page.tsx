import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <div className="text-center flex items-center flex-col mt-10 gap-5">
        <Link href="/login" className="text-xs bg-green-500/10 text-accent rounded-full px-3 py-1.5 flex items-center gap-1">
          Coba Sekarang <Rocket size={16} />
        </Link>
        <h1 className="text-4xl font-bold text-center max-w-4xl">
          Dapatkan pertanyaan dari orang secara <span className="text-accent">anonimus</span> & dapatkan jawaban dari orang melalui <span className="text-accent">form</span>
        </h1>
        <div className='flex gap-3'>
          <Button className='min-w-28 bg-accent rounded-full' size={'lg'}>Get Started</Button>
          <Button className='min-w-28 rounded-full' size={'lg'} variant={'secondary'}>Explor</Button>
        </div>
      </div>
    </main>
  );
}
