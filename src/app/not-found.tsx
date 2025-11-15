import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="bg-secondary p-2 rounded-md mb-2 font-medium">
          404
        </span>
        <h2 className="font-medium text-lg">Not Found</h2>
        <p className="text-zinc-400 text-sm my-2">
          Halaman yang anda cari tidak ditemukan
        </p>
        <Link href="/">
          <Button
            variant={"link"}
            className="flex items-center gap-1 text-zinc-400"
          >
            Beranda <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
