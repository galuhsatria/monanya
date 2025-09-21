'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ResetPassword = {
  newPassword: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ResetPassword>();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const { theme } = useTheme();

  if (!token) {
    redirect('/');
  }

  const onSubmit: SubmitHandler<ResetPassword> = async (user) => {
    const { data, error } = await authClient.resetPassword({
      newPassword: user.newPassword,
      token: token,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Reset password berhasil, silakan login kembali');
      reset();
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full p-4">
          <div className="max-w-96 w-full mx-auto">
            <div className="flex flex-col items-left gap-3 justify-center text-center">
              <Link href={'/'} className="flex gap-1">
                <Image src={theme === 'dark' ? '/monanya-logo-white.png' : '/monanya-logo-black.png'} width={100} height={30} alt="Monanya Logo" unoptimized />
                <Badge className="bg-green-500/10 text-green-500 rounded-full text-xs h-max font-bold">beta</Badge>
              </Link>
              <div className="text-left mt-2">
                <p className="font-bold text-xl">Reset Password</p>
                <p className="font-medium text-muted-foreground text-sm">Masukan passworbd baru kamu.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <label htmlFor="newPassword">Password Baru</label>
                  <div className="flex gap-1 border border-border rounded-md">
                    <Input type={showNewPassword ? 'text' : 'password'} className="border-none rounded-e-none" {...register('newPassword', { required: true })} placeholder="Masukan password baru kamu" />
                    <Button type="button" variant={'ghost'} className="hover:!bg-white" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                </div>
              </div>
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
              <div className="mt-4 flex justify-end">
                <Button type="submit" size={'lg'} disabled={isSubmitting} variant="default" className="bg-accent rounded-full text-white hover:bg-green-600 w-full">
                  {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : 'Reset Password'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
