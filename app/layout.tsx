import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Wallamarket - Buy & Sell Locally",
  description: "The leading platform for buying and selling locally. Safe, simple, and sustainable commerce for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${plusJakartaSans.variable} font-display antialiased bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
