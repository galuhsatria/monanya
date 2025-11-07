"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { authClient } from "@/lib/auth-client";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

type PersonalInformation = {
  name: string;
  username: string;
};

export default function PersonalForm() {
  const { data: session } = authClient.useSession();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<PersonalInformation>({
    defaultValues: {
      name: session?.user?.name || "",
      username: session?.user?.username || "",
    },
  });

  const onSubmit: SubmitHandler<PersonalInformation> = async (
    personalInformation,
  ) => {
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInformation),
      });

      const data = (await res.json()) as { message: string };

      if (!res.ok) {
        toast.error(data.message || "Gagal memperbarui profil");
        return;
      }

      toast.success("Profil berhasil diperbarui");
      reset(personalInformation);
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan server");
    }
  };

  if (!session) {
    return null;
  }

  const watchedName = watch("name");
  const watchedUsername = watch("username");

  const isButtonDisabled =
    !session ||
    isSubmitting ||
    (watchedName === (session?.user?.name || "") &&
      watchedUsername === (session?.user?.username || ""));

  return (
    <div className="border rounded-md mt-4 p-4">
      <p className="text-lg font-bold mb-3">Informasi Personal</p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
          disabled={isButtonDisabled}
          className="bg-accent text-white flex min-w-[82px] w-max justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            "Simpan"
          )}
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
  );
}
