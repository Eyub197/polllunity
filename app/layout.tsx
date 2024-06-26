import type { Metadata } from "next";
import "./globals.css"
import Header from "@/ui/header/Header"
import { inter } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "PollUnity",
  description: "",
}

/**
 * Root layout component
 *
 * This component is the top-most layout component that renders the
 * entire app. It wraps all other components in a standard HTML layout
 * and sets some global styles using CSS modules.
 */
export default function RootLayout({
  children,
}: Readonly<{
  /**
   * The child components to render inside the layout.
   */
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      {/*
       * The root <html> element. This is where we set some global styles
       * using CSS modules and pass the lang attribute.
       */}
      <body className={inter.className}>
        {/*
         * Render the header component at the top of the page.
         *
         * The header component is a separate component that handles its own
         * layout and styling.
         */}
        <Header />
        {/*
         * Render the child components inside the main content area.
         *
         * This is where the app's main content will be rendered.
         */}
        {children}
      </body>
    </html>
  );
}

