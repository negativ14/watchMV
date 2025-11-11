import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeProvider from "@/providers/ThemeProvider";
import StoreProvider from "./StoreProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "watchMV – Watch Movies & TV Shows Instantly",
  metadataBase: new URL("https://watchmv.negativ.in"),
  description:
    "Discover and stream your favorite movies and TV shows with watchMV. Explore trending, top-rated, and upcoming content — all powered by TMDB.",
  keywords: [
    "Movies",
    "TV Shows",
    "watchMV",
    "Streaming",
    "TMDB",
    "Film Discovery",
    "Entertainment",
  ],
  authors: [{ name: "Rohit Mehta", url: "https://negativ.in" }],
  creator: "Rohit Mehta",
  publisher: "watchMV",
  openGraph: {
    title: "watchMV – Stream Movies & TV Shows Instantly",
    description:
      "Explore trending, top-rated, and upcoming movies and TV shows with watchMV. Powered by TMDB.",
    url: "https://watchmv.negativ.in",
    siteName: "watchMV",
    images: [
      {
        url: "/page_preview.png",
        width: 512,
        height: 512,
        alt: "watchMV Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
          data-website-id="84257a7b-fbfc-4a25-8227-6dcc582ca7d3"
        ></script>
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <Toaster />
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
