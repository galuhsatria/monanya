"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { headers } from "next/headers";
import PasswordForm from "@/components/PasswordForm";

type Inputs = {
  name: string;
  username: string;
};

export default function Page() {
  const { data: session, isPending } = authClient.useSession();
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
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
      <div className="flex justify-center items-center h-64 min-h-[100vh]">
        <LoaderCircle size={18} className="animate-spin" />
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    try {
      setDeleteAccountLoading(true);
      await authClient.deleteUser({ callbackURL: "/" });
      toast.success("Akun berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus akun");
    } finally {
      setDeleteAccountLoading(false);
    }
  };

  return (
    <div className="layout my-8 min-h-[100vh]">
      <p className="text-2xl font-bold">Pengaturan Akun</p>

      <div className="border rounded-md mt-4 p-4">
        <p className="text-lg font-bold mb-3">Informasi Personal</p>

        <form className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-full flex flex-col gap-2">
              <p>Nama</p>
              <Input
                {...register("name")}
                placeholder="Nama Anda"
                defaultValue={session.user.name}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p>Username</p>
              <Input
                {...register("username")}
                placeholder="Username Anda"
                defaultValue={session.user.username || ""}
              />
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

      <PasswordForm />

      <div className="border rounded-md mt-4 p-4">
        <p className="text-lg font-bold mb-3 ">Hapus Akun</p>
        <p>
          Anda akan menghapus akun Anda secara permanen. Ini akan menghapus
          semua data yang Anda simpan di aplikasi.
        </p>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive" className="w-max mt-3">
              Hapus Akun
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Anda akan menghapus akun Anda secara permanen. Ini akan
                menghapus semua data yang Anda simpan di aplikasi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-400 text-white min-w-32"
              >
                {deleteAccountLoading ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  "Hapus Akun"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
