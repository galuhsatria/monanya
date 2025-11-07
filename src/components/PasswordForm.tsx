"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

type Password = {
  currentPassword?: string;
  newPassword: string;
};

export default function PasswordForm() {
  const { data: session } = authClient.useSession();
  const [isPasswordSet, setIsPasswordSet] = useState<boolean | undefined>(
    undefined,
  );
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<Password>();

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  useEffect(() => {
    if (!session?.user?.id) return;

    const checkPasswordStatus = async () => {
      try {
        const res = await fetch("/api/check-password-status");
        const data = (await res.json()) as {
          hasPassword: boolean;
        };

        setIsPasswordSet(data.hasPassword);
      } catch (err) {
        console.error("Error checking password status:", err);
      }
    };

    checkPasswordStatus();
  }, [session]);

  const onSubmit: SubmitHandler<Password> = async (password) => {
    try {
      if (isPasswordSet) {
        const { data, error } = await authClient.changePassword({
          currentPassword: password.currentPassword!,
          newPassword: password.newPassword,
          revokeOtherSessions: true,
        });

        if (error) throw new Error(error.message);

        toast.success("Password berhasil diubah");
      } else {
        const response = await fetch("/api/set-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: password.newPassword }),
        });

        if (!response.ok) throw new Error("Gagal mengatur password");

        toast.success("Password berhasil diset");
      }

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  const isButtonDisabled =
    isSubmitting || !newPassword || (isPasswordSet && !currentPassword);

  return (
    <div className="border rounded-md mt-4 p-4 space-y-4">
      <p className="text-lg font-bold">
        {isPasswordSet ? "Ubah Password" : "Set Password"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {isPasswordSet && (
          <div>
            <p className="mb-2">Password Lama</p>
            <div className="flex border border-border rounded-md">
              <Input
                type={showPassword.current ? "text" : "password"}
                placeholder="Masukkan password lama"
                className="flex-1 border-none rounded-e-none"
                disabled={isSubmitting}
                {...register("currentPassword", { required: true })}
              />
              <Button
                type="button"
                variant="ghost"
                className="!hover:bg-background"
                onClick={() =>
                  setShowPassword((p) => ({ ...p, current: !p.current }))
                }
              >
                {showPassword.current ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
          </div>
        )}

        <div>
          <p className="mb-2">Buat Password Baru</p>
          <div className="flex border border-border rounded-md">
            <Input
              type={showPassword.new ? "text" : "password"}
              placeholder="Buat password baru"
              className="flex-1 border-none rounded-e-none"
              disabled={isSubmitting}
              {...register("newPassword", { required: true })}
            />
            <Button
              type="button"
              variant="ghost"
              className="!hover:bg-background"
              onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
            >
              {showPassword.new ? <EyeClosed /> : <Eye />}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isButtonDisabled}
          className="bg-accent text-white flex min-w-[82px] justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            "Simpan"
          )}
        </Button>
      </form>
    </div>
  );
}
