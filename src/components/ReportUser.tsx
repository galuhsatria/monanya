"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type ReportUser = {
  reason: string;
};

export default function ReportUser({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ReportUser>();

  const onSubmit: SubmitHandler<ReportUser> = async (data) => {
    try {
      const report = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            reason: data.reason,
          }),
        },
      );

      if (report.ok) {
        toast.success("Laporan berhasil dikirim");
      }

      reset();
    } catch {
      toast.error("Laporan gagal dikirim");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <p className="hover:text-accent">Laporkan Pengguna</p>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Laporkan Pengguna</DialogTitle>
            <DialogDescription>
              <Textarea
                {...register("reason", { required: true })}
                disabled={isSubmitting}
                placeholder="Masukan alasan melaporkan pengguna"
                rows={20}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className="bg-accent">
              {isSubmitting ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                "Laporkan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
