'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { LoaderCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ResetPassword = {
  email: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ResetPassword>();

  const { theme } = useTheme();

  const onSubmit: SubmitHandler<ResetPassword> = async (user) => {
    const { data, error } = await authClient.requestPasswordReset({
      email: user.email,
      redirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/reset-password',
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Tautan reset password telah dikirim ke email Anda');
      reset();
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-full p-4">
          <div className="max-w-96 mx-auto w-full">
            <div className="flex flex-col items-left gap-3 justify-center text-center">
              <Link href={'/'} className="flex gap-1">
                <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
                <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
              </Link>
              <div className="text-left mt-2">
                <p className="font-bold text-xl">Lupa Password</p>
                <p className="font-medium text-muted-foreground text-sm">Kami akan mengirimkan tautan reset password ke email kamu.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    placeholder="Masukan alamat email kamu"
                    className="focus-visible:ring-0"
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Format email tidak valid',
                      },
                    })}
                  />
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

              <div className="mt-4 flex justify-end">
                <Button type="submit" size={'lg'} disabled={isSubmitting} variant="default" className="bg-accent text-white hover:bg-green-600 w-full rounded-full">
                  {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : 'Kirim Tautan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
