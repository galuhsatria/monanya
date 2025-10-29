import { LoaderCircle } from "lucide-react";
import React from "react";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <div>
            <LoaderCircle className="w-10 h-10 animate-spin" />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
