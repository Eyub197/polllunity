import type { Metadata } from "next";
import "./globals.css"
import Header from "@/ui/header/Header"
import { inter } from "@/lib/fonts"
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "PollUnity",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={inter.className}>
        <Header/> 
        {children}
      </body>
    </html>
  )
}
