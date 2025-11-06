"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuestion } from "@/hooks/use-api";
import { authClient } from "@/lib/auth-client";
import { LoaderCircle, MailQuestionMark, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CopyButton } from "./CopyButton";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface Question {
  id: string;
  question: string;
  status: string;
  createdAt: string;
}

export default function MessageDone() {
  const { data, isError, isLoading, mutate } = useQuestion({ status: "done" });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const [selected, setSelected] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (!data?.questions) return;
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(data.questions.map((q: Question) => q.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async (ids: string[]) => {
    try {
      setDeleteLoading(true);
      const res = await fetch("/api/questions/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      if (!res.ok) throw new Error("Gagal menghapus pertanyaan");
      toast.success(`${ids.length} pertanyaan berhasil dihapus`);
      setSelected([]);
      setSelectAll(false);
      mutate();
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menghapus");
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex w-full justify-center py-5 mt-4">
        <LoaderCircle className="animate-spin text-zinc-400" size={18} />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-5 mt-4">
        Gagal memuat data pertanyaan.
      </div>
    );

  if (data.questions.length === 0)
    return (
      <div className="flex flex-col items-center text-center py-5 mt-4">
        <div className="bg-secondary p-2 rounded-md mb-2">
          <MailQuestionMark />
        </div>
        <p className="font-medium text-sm text-zinc-600">
          Belum ada pertanyaan. Mulai dengan bagikan tautan akun Anda.
        </p>
        {session ? (
          <div className="flex items-center text-sm gap-2 bg-secondary py-1.5 px-3 mt-4 rounded-md">
            <p>
              {process.env.NEXT_PUBLIC_BASE_URL + `/${session.user.username}`}
            </p>
            <CopyButton
              content={
                process.env.NEXT_PUBLIC_BASE_URL + `/${session.user.username}`
              }
              copyMessage="Tautan berhasil disalin"
            />
          </div>
        ) : null}
      </div>
    );

  return (
    <div className="flex flex-col gap-3 my-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectAll}
            onCheckedChange={handleSelectAll}
            id="select-all"
          />
          <label htmlFor="select-all" className="text-sm text-zinc-600">
            Pilih semua
          </label>
        </div>

        {selected.length > 0 && (
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex gap-2 items-center text-sm"
              >
                <Trash size={16} /> Hapus Terpilih ({selected.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin ingin menghapus {selected.length} pertanyaan
                  terpilih? Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selected)}
                  disabled={deleteLoading}
                  className="min-w-20"
                >
                  {deleteLoading ? (
                    <LoaderCircle className="animate-spin" size={16} />
                  ) : (
                    "Hapus"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {data.questions.map((q: Question) => (
        <div
          key={q.id}
          className="border w-full flex justify-between rounded-md items-center p-2"
        >
          <div className="flex gap-2 items-center">
            <Checkbox
              checked={selected.includes(q.id)}
              onCheckedChange={() => handleSelect(q.id)}
            />
            <div className="text-left">
              <p className="text-zinc-500 text-sm">{formatDate(q.createdAt)}</p>
              <p>{q.question}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="group">
                <Trash className="group-hover:text-red-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin ingin menghapus pertanyaan ini?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Batal</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete([q.id])}
                  disabled={deleteLoading}
                  className="min-w-20"
                >
                  {deleteLoading ? (
                    <LoaderCircle className="animate-spin" size={16} />
                  ) : (
                    "Hapus"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
