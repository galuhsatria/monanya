import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monanya.vercel.app"),

  title: {
    default: "Monanya",
    template: "%s | Monanya",
  },

  description:
    "Monanya adalah platform untuk mengirim dan menerima pertanyaan secara anonim dengan mudah, cepat, dan aman.",

  keywords: [
    "monanya",
    "anonim",
    "anonymous questions",
    "ngirim pertanyaan",
    "platform anonim",
    "tanya jawab anonim",
  ],

  authors: [{ name: "Monanya Team" }],
  creator: "Monanya",
  publisher: "Monanya",

  openGraph: {
    type: "website",
    url: "https://monanya.vercel.app",
    title: "Monanya — Dapatkan pertanyaan anonim",
    description:
      "Kirim dan dapatkan pertanyaan anonim dengan mudah. Bebas ekspresikan pikiranmu tanpa identitas.",
    siteName: "Monanya",
    images: [
      {
        url: "https://monanya.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Monanya OpenGraph",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Monanya — Platform Pertanyaan Anonim",
    description:
      "Kirim dan dapatkan pertanyaan anonim. Bebas ekspresikan pikiranmu tanpa identitas.",
    images: ["/opengraph-image"],
    creator: "@monanya",
  },

  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },

  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="784b41f6-2b1f-4498-bc45-1a3c0f9a9300"
        ></script>
      </head>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" expand />
      </body>
    </html>
  );
}
