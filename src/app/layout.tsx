import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/sonner"

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Monanya',
  description: 'Sebuah platform untuk mengirim pertanyaan secara anonimus',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster position='top-center' richColors expand theme='light'  closeButton/>
      </body>
    </html>
  );
}
