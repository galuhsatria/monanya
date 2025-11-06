import QuestionDone from "@/components/QuestionDone";
import QuestionPending from "@/components/QuestionPending";
import Share from "@/components/Share";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="layout mt-10 min-h-[100vh]">
      <Tabs defaultValue="belum-terjawab" className="rounded-full">
        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <h2 className="text-xl font-bold flex gap-2 items-center">
            Pertanyaan{" "}
            {session?.user.username && (
              <Share align="start" username={session?.user.username} />
            )}
          </h2>
          <TabsList className="rounded-full cursor-pointer ml-auto max-sm:ml-0 max-sm:self-end">
            <TabsTrigger
              value="belum-terjawab"
              className="rounded-full cursor-pointer"
            >
              Belum Terjawab
            </TabsTrigger>
            <TabsTrigger
              value="sudah-terjawab"
              className="rounded-full cursor-pointer"
            >
              Sudah Terjawab
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="belum-terjawab" className="">
          <QuestionPending />
        </TabsContent>
        <TabsContent value="sudah-terjawab">
          <QuestionDone />
        </TabsContent>
      </Tabs>
    </div>
  );
}
