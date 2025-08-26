import type { Metadata } from "next";
import { Quicksand, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FGMI Kolaborasi",
  description: "Forum Geosaintis Muda Indonesia - Kolaborasi",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${quicksand.variable} ${rubik.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />

          {/* Snap Midtrans */}
          {/* <Script
            src="https://app.sandbox.midtrans.com/snap/snap.js" 
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} 
          /> */}
        </body>
      </html>
    </>
  )
}
