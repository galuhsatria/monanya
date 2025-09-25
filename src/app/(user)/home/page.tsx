import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

export default function Page() {
  return (
    <div className="layout mt-10">
      <Tabs defaultValue="belum-terjawab" className="rounded-full">
        <div className="flex items-center justify-between">
          <h2 className='text-xl font-bold'>Pertanyaan</h2>
          <TabsList className="rounded-full">
            <TabsTrigger value="belum-terjawab" className="rounded-full">
              Belum Terjawab
            </TabsTrigger>
            <TabsTrigger value="sudah-terjawab" className="rounded-full">
              Sudah Terjawab
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="belum-terjawab">HELLLnah</TabsContent>
        <TabsContent value="sudah-terjawab">OKEE</TabsContent>
      </Tabs>
    </div>
  );
}
