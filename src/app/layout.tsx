import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/sonner"

const manrope = Manrope({
  variable: '--font-manrope-sans',
  subsets: ['latin'],
  weight: ['200', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'MoNanya',
  description: 'Sebuah platform untuk mengirim pertanyaan secara anonimus',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster position='top-center' richColors expand theme='light'  closeButton/>
      </body>
    </html>
  );
}
