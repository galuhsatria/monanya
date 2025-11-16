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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuestion } from "@/hooks/use-api";
import { authClient } from "@/lib/auth-client";
import * as htmlToImage from "html-to-image";
import {
  Check,
  Download,
  LoaderCircle,
  MailQuestion,
  MailQuestionMark,
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { CopyButton } from "./CopyButton";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Question {
  id: string;
  question: string;
  status: string;
}

type AspectRatio = "9:16" | "16:9" | "1:1";

export default function QuestionPending() {
  const { data, isError, isLoading, mutate } = useQuestion({
    status: "pending",
  });
  const [questionIsDoneLoading, setQuestionIsDoneLoading] = useState(false);
  const { data: session } = authClient.useSession();
  console.log(session);

  const [theme, setTheme] = useState({
    backgroundColor: "#cae7b9",
    color: "#222222",
    font: "Inter",
    pattern: "Polkadot",
    aspectRatio: "16:9" as AspectRatio,
  });

  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getAspectRatioSize = (ratio: AspectRatio) => {
    const baseSize = 1080;
    switch (ratio) {
      case "9:16":
        return { width: 1080, height: 1920 };
      case "16:9":
        return { width: 1920, height: 1080 };
      case "1:1":
        return { width: baseSize, height: baseSize };
    }
  };

  const handleDownloadImage = async (q: Question) => {
    const node = refs.current[q.id];
    if (!node) return;

    try {
      const { width, height } = getAspectRatioSize(theme.aspectRatio);

      const currentWidth = node.offsetWidth;
      const currentHeight = node.offsetHeight;
      const scaleX = width / currentWidth;
      const scaleY = height / currentHeight;

      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1.0,
        pixelRatio: 1,
        width: width,
        height: height,
        style: {
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
          width: `${currentWidth}px`,
          height: `${currentHeight}px`,
        },
      });

      const link = document.createElement("a");
      link.download = `pertanyaan-${q.id}-${theme.aspectRatio.replace(":", "x")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Gagal mengunduh gambar:", error);
    }
  };

  const handleQuestionDone = async (id: string) => {
    try {
      setQuestionIsDoneLoading(true);
      const res = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "done" }),
      });

      if (res.ok) {
        toast.success("Pertanyaan sudah dijawab");
        mutate();
      }
    } catch {
      toast.error("Gagal menandai pertanyaan sudah dijawab");
    } finally {
      setQuestionIsDoneLoading(false);
    }
  };

  const getContainerClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case "9:16":
        return "aspect-[9/16] w-[300px]";
      case "16:9":
        return "aspect-[16/9] w-full max-w-[500px]";
      case "1:1":
        return "aspect-square w-full max-w-[400px]";
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
      <div className="flex flex-col items-center text-center py-5  mt-4">
        <div className="bg-secondary p-2 rounded-md mb-2">
          <MailQuestionMark className="" />
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
    <>
      <div className="grid lg:grid-cols-12 md:grid-cols-6 grid-cols-3 gap-4 mt-4">
        {data.questions.map((q: Question) => (
          <Dialog key={q.id}>
            <DialogTrigger className="group">
              <div className="p-3 transition-all duration-150 rounded-lg bg-green-100/40 dark:bg-zinc-800 flex justify-center cursor-pointer group-hover:bg-accent-secondary">
                <MailQuestion
                  className="text-accent group-hover:!text-white"
                  size={40}
                  strokeWidth={1.3}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-sm:w-11/12 sm:w-max">
              <DialogHeader className="sticky top-0 z-10">
                <DialogTitle className="max-sm:text-left">
                  Pertanyaan
                </DialogTitle>
                <DialogDescription>
                  <div className="flex gap-2 max-sm:flex-col mt-2 max-sm:items-start max-sm:text-left max-sm:gap-3 justify-between items-start">
                    <div>
                      <p className="font-medium mb-2">Background</p>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) =>
                            setTheme((prev) => ({
                              ...prev,
                              backgroundColor: value,
                            }))
                          }
                          defaultValue="#cae7b9"
                        >
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Warna" />
                          </SelectTrigger>
                          <SelectContent className="flex">
                            <SelectItem value="#cae7b9">
                              <div className="h-4 w-4 rounded-full bg-[#cae7b9]"></div>
                            </SelectItem>
                            <SelectItem value="#222222">
                              <div className="h-4 w-4 rounded-full bg-[#222222]"></div>{" "}
                            </SelectItem>
                            <SelectItem value="#ebebeb">
                              <div className="h-4 w-4 rounded-full bg-[#ebebeb]"></div>
                            </SelectItem>
                            <SelectItem value="#f3de8a">
                              <div className="h-4 w-4 rounded-full bg-[#f3de8a]"></div>
                            </SelectItem>
                            <SelectItem value="#8abdf2">
                              <div className="h-4 w-4 rounded-full bg-[#8abdf2]"></div>
                            </SelectItem>
                            <SelectItem value="#eb9486">
                              <div className="h-4 w-4 rounded-full bg-[#eb9486]"></div>
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          onValueChange={(value) =>
                            setTheme((prev) => ({ ...prev, pattern: value }))
                          }
                        >
                          <SelectTrigger className="w-[70px] max-sm:w-[150px]">
                            <SelectValue placeholder="Pola" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Polkadot">Polkadot</SelectItem>
                            <SelectItem value="Stripes">Garis</SelectItem>
                            <SelectItem value="Grid">Kisi</SelectItem>
                            <SelectItem value="Plain">Polos</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          onValueChange={(value: AspectRatio) =>
                            setTheme((prev) => ({
                              ...prev,
                              aspectRatio: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Rasio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1:1">
                              <Square />
                            </SelectItem>
                            <SelectItem value="9:16">
                              <RectangleVertical />
                            </SelectItem>
                            <SelectItem value="16:9">
                              <RectangleHorizontal />
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Text</p>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) =>
                            setTheme((prev) => ({ ...prev, font: value }))
                          }
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Font" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Merriweather">
                              Merriweather
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          onValueChange={(value) =>
                            setTheme((prev) => ({
                              ...prev,
                              color: value,
                            }))
                          }
                          defaultValue="#222222"
                        >
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Warna" />
                          </SelectTrigger>
                          <SelectContent className="flex">
                            <SelectItem value="#222222">
                              <div className="h-4 w-4 rounded-full bg-[#222222]"></div>{" "}
                            </SelectItem>
                            <SelectItem value="#ebebeb">
                              <div className="h-4 w-4 rounded-full bg-[#ebebeb]"></div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[320px]">
                <div className="flex justify-center mt-4 overflow-auto">
                  <div
                    ref={(el) => {
                      refs.current[q.id] = el;
                    }}
                    className={`${getContainerClass(theme.aspectRatio)} rounded-md`}
                    style={{
                      backgroundColor: theme.backgroundColor,
                      color: theme.color,
                      fontFamily: theme.font,
                      backgroundImage:
                        theme.pattern === "Polkadot"
                          ? "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)"
                          : theme.pattern === "Stripes"
                            ? "repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 6px)"
                            : theme.pattern === "Grid"
                              ? "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)"
                              : "none",
                      backgroundSize:
                        theme.pattern === "Grid"
                          ? "20px 20px"
                          : theme.pattern === "Polkadot"
                            ? "15px 15px"
                            : "auto",
                      padding: "16px",
                    }}
                  >
                    <div className="text-sm wrap-anywhere whitespace-pre-line flex flex-col justify-center items-center text-center h-full px-4">
                      <p className="font-medium">{q.question}</p>
                      <div className="flex bg-white gap-1 mx-auto mt-4 px-3 py-1 rounded-full w-max border shadow">
                        <Image
                          src={"/monanya-logo-black.png"}
                          width={50}
                          height={30}
                          alt="Monanya Logo"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <Button
                variant="outline"
                className="w-max"
                onClick={() => handleDownloadImage(q)}
                title="Download pertanyaan sebagai gambar"
              >
                Download
                <Download size={16} />
              </Button>
              <DialogFooter className="flex justify-between items-center max-sm:items-end">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleQuestionDone(q.id)}
                    className="bg-accent-secondary min-w-52 hover:bg-accent-secondary hover:brightness-110 rounded-full text-white"
                  >
                    {questionIsDoneLoading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <p className="flex items-center gap-2">
                        Tandai Sudah Dijawab <Check />
                      </p>
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}
