import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ban.social - Improve your social circle",
  description: "Your network is your net worth so stop hanging out with low value individuals and start connectin with people that will help you improve.",
  openGraph: {
    title: 'ban.social - Improve your social circle',
    description: 'Your network is your net worth so stop hanging out with low value individuals and start connectin with people that will help you improve.',
    url: 'https://ban.social/',
    siteName: 'ban.social',
    images: [
      {
        url: 'https://ban.social/og/800x600.png',
        width: 800,
        height: 600,
        alt: 'ban.social OG image'
      },
      {
        url: 'https://ban.social/og/1800x1600.png',
        width: 1800,
        height: 1600,
        alt: 'Ban.social OG image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
