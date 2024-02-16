import type { Metadata } from "next";
import "./globals.css"
import Header from "@/ui/header/header"
import { inter } from "@/lib/fonts"

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
    <html lang="en">
      <body className={inter.className}>
        {/* <Header/> */}
        {children}
      </body>
    </html>
  )
}
