import QuestionForm from "@/components/QuestionForm";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/UserNav";
import { User } from "@/lib/db/queries";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await User.getUserByUsername(username);

  if (!user) {
    return notFound();
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <UserNav username={username} />
      <div className="flex flex-col items-center mt-6 ">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full mb-4"
            unoptimized
          />
        ) : (
          <div>
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-3">
              <span className="text-3xl text-white font-bold">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
          </div>
        )}
        <p className="font-bold">@{username}</p>
      </div>
      <p className="text-center font-bold text-xl my-2">
        {" "}
        Bertanya ke {user.name}
      </p>
      <QuestionForm userId={user.id} />
      <Link href="/register" className="flex justify-center text-xs mt-4">
        <Button variant={"outline"} className="rounded-full">
          Join {user.name} on Monanya!
        </Button>
      </Link>
      <div className="flex text-sm mt-3 gap-1 items-center justify-center text-muted-foreground">
        <Link href="/report-user" className="hover:text-accent">
          Laporkan Pengguna
        </Link>
        <Dot />
        <Link href="/privasi" className="hover:text-accent">
          Privasi
        </Link>
      </div>
    </div>
  );
}
