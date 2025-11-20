import { Button } from "@/components/ui/button";
import { Github, Rocket } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="layout overflow-x-hidden">
      <div className="flex mt-20 flex-col justify-center items-center text-center">
        <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-14 max-sm:leading-normal max-w-xl">
          Dapatkan pertanyaan dari siapa saja secara{" "}
          <span className="text-accent">100% anonim</span>
        </h1>
        <p className="text-lg max-sm:text-base font-medium text-muted-foreground mt-3 mb-4">
          Berikan kesempatan bertanya atau memberikan pesan secara bebas tanpa
          identitas.
        </p>
        <div className="flex gap-3 mt-4">
          <Link href="/register">
            <Button
              className="min-w-28 bg-accent rounded-full dark:text-white"
              size={"lg"}
            >
              Get Started <Rocket size={16} />
            </Button>
          </Link>
          <Link href="https://github.com/galuhsatria/monanya">
            <Button
              className="min-w-28 rounded-full"
              variant={"secondary"}
              size={"lg"}
            >
              Github <Github size={16} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-10 mt-16 ">
        <div className="dark:bg-card bg-zinc-100 rounded-md p-4">
          <div className="dark:bg-secondary bg-zinc-200 rounded-md p-3 w-max">
            ⚡
          </div>
          <p className="font-medium mt-4 text-lg">Gratis</p>
          <p className="text-sm text-muted-foreground mt-1">
            Dapat digunakan secara gratis dan tanpa batas
          </p>
        </div>
        <div className="dark:bg-card bg-zinc-100 rounded-md p-4">
          <div className="dark:bg-secondary bg-zinc-200 rounded-md p-3 w-max">
            🔗
          </div>
          <p className="font-medium mt-4 text-lg">Mudah</p>
          <p className="text-sm text-muted-foreground mt-1">
            Bagikan tautan akun anda dengan mudah
          </p>
        </div>
        <div className="dark:bg-card bg-zinc-100 rounded-md p-4">
          <div className="dark:bg-secondary bg-zinc-200 rounded-md p-3 w-max">
            🔐
          </div>
          <p className="font-medium mt-4 text-lg">Aman</p>
          <p className="text-sm text-muted-foreground mt-1">
            Semua pertanyaan yang dikumpulkan secara aman
          </p>
        </div>
        <div className="dark:bg-card bg-zinc-100 rounded-md p-4">
          <div className="dark:bg-secondary bg-zinc-200 rounded-md p-3 w-max">
            🌐
          </div>
          <p className="font-medium mt-4 text-lg">Open Source</p>
          <p className="text-sm text-muted-foreground mt-1">
            Dibangun dengan kode terbuka dan dapat diakses oleh siapa saja.
          </p>
        </div>
      </div>
    </main>
  );
}
