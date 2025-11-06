"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { HatGlasses, Send } from "lucide-react";

type Question = {
  question: string;
};

export default function QuestionForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm<Question>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Question> = async (data) => {
    try {
      const question = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            question: data.question,
          }),
        },
      );

      if (!question.ok) {
        throw new Error("Failed to submit question");
      } else {
        toast.success("Pertanyaan berhasil dikirim!");
      }

      reset();
    } catch (err) {
      toast.error("Gagal mengirim pertanyaan. Silakan coba lagi.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="question" className="text-base font-semibold">
          Pertanyaan
        </label>
        <Textarea
          {...register("question", {
            required: true,
            minLength: {
              value: 20,
              message: "Pertanyaan minimal 20 karakter",
            },
          })}
          className="w-full p-2 border rounded h-32 mt-2"
          placeholder="Tulis pertanyaanmu..."
          disabled={isSubmitting}
        />
        <p className="flex text-sm items-center text-zinc-400 gap-2 mt-2">
          <HatGlasses size={16} /> Pertanyaan akan dikirim secara anonim
        </p>
        <p className="text-sm text-red-500">{errors.question?.message}</p>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="mt-4 bg-accent rounded-full w-full dark:text-white"
          size={"lg"}
        >
          <Send /> {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
        </Button>
      </form>
    </div>
  );
}
