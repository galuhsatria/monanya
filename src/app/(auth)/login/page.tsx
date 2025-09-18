'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Eye, EyeClosed, LoaderCircle, TriangleAlert } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type UserLogin = {
  email: string;
  password: string;
};
export default function Page() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = async (user) => {
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: rememberMe,
      callbackURL: process.env.NEXT_PUBLIC_BASE_URL + '/dashboard',
    });

    if (data) {
      reset();
      toast.success('Login berhasil!');
    } else if (error) {
      toast.error(error.message);
      return null;
    }

  };

  const signIn = async (provider: string) => {
    const data = await authClient.signIn.social({
      provider: provider,
      callbackURL: process.env.NEXT_PUBLIC_BASE_URL + '/dashboard',
    });

    return data;
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-full p-4">
        <div className="max-w-96 mx-auto w-full">
          <Link href={'/'} className="flex gap-1">
            <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
            <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
          </Link>
          <div className="text-left mt-4">
            <p className="font-bold text-xl">Login</p>
            <p className="font-medium text-muted-foreground text-sm">Masukan email dan password anda untuk login</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4 font-medium">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Input type="email" {...register('email', { required: true })} placeholder="Masukan alamat email anda" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="password">Password</label>
                <Link href="/forgot-password" className="text-accent ">
                  Lupa Passsword?
                </Link>
              </div>
              <div className="flex gap-1 border border-border rounded-md">
                <Input type={showPassword ? 'text' : 'password'} className="border-none rounded-e-none" {...register('password', { required: true })} placeholder="Masukan password anda" />
                <Button type="button" variant={'ghost'} className="hover:!bg-white" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeClosed /> : <Eye />}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Checkbox checked={rememberMe} onCheckedChange={(value) => setRememberMe(value === true)} />
              Remember me
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-accent rounded-full  hover:bg-[#27945f] " size={'lg'}>
              {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : 'Login'}
            </Button>
          </form>
          <div className="flex items-center gap-3 mt-4 text-sm">
            <hr className="inline-block flex-4 border border-border" />
            <span className="uppercase">Atau login dengan</span>
            <hr className="inline-block flex-4 border border-border" />
          </div>
          <div className="flex gap-2 mb-3 mt-4">
            <Button variant={'outline'} onClick={() => signIn('google')}>
              <svg width="800px" height="800px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
              </svg>
              Login dengan Google
            </Button>
            <Button variant={'outline'} onClick={() => signIn('github')}>
              {' '}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              Login dengan Github
            </Button>
          </div>
          <p className="font-medium text-center">
            Belum punya akun?{' '}
            <Link href={'/register'} className="text-accent underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
