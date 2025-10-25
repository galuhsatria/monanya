"use client";

import { useQuestion } from "@/hooks/use-api";
import React from "react";
import { LoaderIcon, MailQuestion, MailQuestionMark } from "lucide-react";

interface Question {
  id: string;
  question: string;
  status: string;
}

export default function QuestionPending() {
  const { data, isError, isLoading } = useQuestion({ status: "pending" });

  if (isLoading)
    return (
      <div className="flex w-full justify-center py-5">
        <LoaderIcon className="animate-spin text-zinc-400" size={18} />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 py-5">
        Gagal memuat data pertanyaan.
      </div>
    );

  if (data.questions.length === 0)
    return (
      <div className="flex flex-col items-center text-center py-5 text-zinc-600">
        <MailQuestionMark className="mb-2" />
        <p>Belum ada pertanyaan. Mulai dengan bagikan tautan akun Anda.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-11 gap-4 mt-8">
      {data.questions.map((q: Question) => (
        <div key={q.id} className="group ">
          <div className="p-3 transition-all duration-150 rounded-lg bg-green-100/40 dark:bg-zinc-800 flex justify-center cursor-pointer group-hover:bg-accent-secondary ">
            <MailQuestion
              className="text-accent group-hover:!text-white"
              size={40}
              strokeWidth={1.3}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
