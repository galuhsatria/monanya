"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Inputs = {
  name: string;
  username: string;
};

type PasswordInputs = {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Page() {
  const { data: session, isPending } = authClient.useSession();
  const [isChanged, setIsChanged] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    reset: resetPassword,
    formState: { isSubmitting: isSubmittingPassword },
  } = useForm<PasswordInputs>();

  if (isPending || !session) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="layout mt-8">
      <p className="text-2xl font-bold">Pengaturan Akun</p>

      {/* Informasi Personal */}
      <div className="border rounded-md mt-4 p-4">
        <p className="text-lg font-bold mb-3">Informasi Personal</p>

        <form className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-full flex flex-col gap-2">
              <p>Nama</p>
              <Input {...register("name")} placeholder="Nama Anda" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>Username</p>
              <Input {...register("username")} placeholder="Username Anda" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isChanged || isSubmitting}
            className="w-max bg-accent dark:text-white"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>

        <div className="w-full flex flex-col gap-2 mt-4">
          <p>Email</p>
          <Input
            defaultValue={session.user.email}
            disabled
            className="bg-secondary"
          />
        </div>
      </div>

      <div className="border rounded-md mt-4 p-4">
        <p className="text-lg font-bold mb-3 text-red-600">Hapus Akun</p>
        <Button variant="destructive" className="w-max">
          Hapus Akun
        </Button>
      </div>
    </div>
  );
}
